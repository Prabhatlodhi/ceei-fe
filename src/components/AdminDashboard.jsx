import { useState, useEffect } from "react";
import { Eye, Check, Trash2, Filter, BarChart3, RefreshCw, Search, Calendar, CheckCircle, XCircle } from "lucide-react";
import { getAllFeedback, markAsReviewed, deleteFeedback, getFeedbackStats } from "../services/api";

function AdminDashboard() {
	const [feedback, setFeedback] = useState([]);
	const [stats, setStats] = useState({});
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({
		category: "",
		reviewed: "",
		page: 1,
		limit: 10,
	});
	const [pagination, setPagination] = useState({});
	const [searchTerm, setSearchTerm] = useState("");
	const [message, setMessage] = useState("");

	const categories = ["Work Environment", "Leadership", "Growth", "Others"];

	useEffect(() => {
		fetchFeedback();
		fetchStats();
	}, [filters]);

	const fetchFeedback = async () => {
		setLoading(true);
		try {
			const data = await getAllFeedback(filters);
			setFeedback(data.data || []);
			setPagination({
				page: data.page,
				pages: data.pages,
				total: data.total,
			});
		} catch (error) {
			setMessage("Failed to fetch feedback");
		} finally {
			setLoading(false);
		}
	};

	const fetchStats = async () => {
		try {
			const data = await getFeedbackStats();
			setStats(data.data);
		} catch (error) {
			console.error("Failed to fetch stats:", error);
		}
	};

	const handleMarkReviewed = async (id) => {
		try {
			await markAsReviewed(id);
			setMessage("Feedback marked as reviewed");
			fetchFeedback();
			fetchStats();
		} catch (error) {
			setMessage("Failed to mark as reviewed");
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this feedback?")) {
			return;
		}

		try {
			await deleteFeedback(id);
			setMessage("Feedback deleted successfully");
			fetchFeedback();
			fetchStats();
		} catch (error) {
			setMessage("Failed to delete feedback");
		}
	};

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
			page: 1, // Reset to first page when filtering
		}));
	};

	const handlePageChange = (newPage) => {
		setFilters((prev) => ({
			...prev,
			page: newPage,
		}));
	};

	const filteredFeedback = feedback.filter((item) => item.feedback.toLowerCase().includes(searchTerm.toLowerCase()));

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="max-w-7xl mx-auto space-y-6">
			{/* Header */}
			<div className="card-glass p-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
					<div>
						<h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
							Admin Dashboard
						</h2>
						<p className="text-gray-400">Manage and review employee feedback</p>
					</div>
					<button
						onClick={() => {
							fetchFeedback();
							fetchStats();
						}}
						className="btn-secondary flex items-center space-x-2"
					>
						<RefreshCw className="w-4 h-4" />
						<span>Refresh</span>
					</button>
				</div>
			</div>

			{/* Statistics Cards */}
			{stats.totalFeedback !== undefined && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="card-glass p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-400">Total Feedback</p>
								<p className="text-2xl font-bold text-gray-100">{stats.totalFeedback}</p>
							</div>
							<BarChart3 className="w-8 h-8 text-purple-400" />
						</div>
					</div>
					<div className="card-glass p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-400">Reviewed</p>
								<p className="text-2xl font-bold text-emerald-400">{stats.totalReviewed}</p>
							</div>
							<CheckCircle className="w-8 h-8 text-emerald-400" />
						</div>
					</div>
					<div className="card-glass p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-400">Pending Review</p>
								<p className="text-2xl font-bold text-orange-400">{stats.totalUnreviewed}</p>
							</div>
							<XCircle className="w-8 h-8 text-orange-400" />
						</div>
					</div>
					<div className="card-glass p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-400">Categories</p>
								<p className="text-2xl font-bold text-violet-400">{stats.categoryStats?.length || 0}</p>
							</div>
							<Filter className="w-8 h-8 text-violet-400" />
						</div>
					</div>
				</div>
			)}

			{/* Filters and Search */}
			<div className="card-glass p-6">
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
					{/* Search */}
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
						<input
							type="text"
							placeholder="Search feedback..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-500 text-gray-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200"
						/>
					</div>

					{/* Filters */}
					<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
						<select
							value={filters.category}
							onChange={(e) => handleFilterChange("category", e.target.value)}
							className="px-4 py-3 bg-gray-900 border border-gray-500 text-gray-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200"
						>
							<option value="">All Categories</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>

						<select
							value={filters.reviewed}
							onChange={(e) => handleFilterChange("reviewed", e.target.value)}
							className="px-4 py-3 bg-gray-900 border border-gray-500 text-gray-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200"
						>
							<option value="">All Status</option>
							<option value="true">Reviewed</option>
							<option value="false">Pending Review</option>
						</select>

						<select
							value={filters.limit}
							onChange={(e) => handleFilterChange("limit", e.target.value)}
							className="px-4 py-3 bg-gray-900 border border-gray-500 text-gray-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200"
						>
							<option value="5">5 per page</option>
							<option value="10">10 per page</option>
							<option value="20">20 per page</option>
							<option value="50">50 per page</option>
						</select>
					</div>
				</div>
			</div>

			{/* Message */}
			{message && (
				<div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
					<p className="text-purple-300">{message}</p>
				</div>
			)}

			{/* Feedback Table */}
			<div className="card-glass overflow-hidden">
				{loading ? (
					<div className="flex items-center justify-center py-12">
						<div className="spinner w-8 h-8"></div>
						<span className="ml-2 text-gray-400">Loading feedback...</span>
					</div>
				) : filteredFeedback.length === 0 ? (
					<div className="text-center py-12">
						<Eye className="w-12 h-12 text-gray-600 mx-auto mb-4" />
						<p className="text-gray-400">No feedback found</p>
					</div>
				) : (
					<div className="overflow-x-auto custom-scrollbar">
						<table className="w-full">
							<thead className="bg-gray-900/50 border-b border-gray-700">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Feedback
									</th>
									<th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Category
									</th>
									<th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Submitted
									</th>
									<th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-800">
								{filteredFeedback.map((item) => (
									<tr key={item._id} className="table-row">
										<td className="px-6 py-4">
											<div className="max-w-xs lg:max-w-md">
												<p className="text-sm text-gray-200 truncate" title={item.feedback}>
													{item.feedback}
												</p>
											</div>
										</td>
										<td className="px-6 py-4">
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-500/30">
												{item.category}
											</span>
										</td>
										<td className="px-6 py-4">
											{item.isReviewed ? (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-300 border border-emerald-500/30">
													<CheckCircle className="w-3 h-3 mr-1" />
													Reviewed
												</span>
											) : (
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-900/50 text-orange-300 border border-orange-500/30">
													<XCircle className="w-3 h-3 mr-1" />
													Pending
												</span>
											)}
										</td>
										<td className="px-6 py-4 text-sm text-gray-400">
											<div className="flex items-center">
												<Calendar className="w-4 h-4 mr-1" />
												{formatDate(item.submissionTime)}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center space-x-2">
												{/* Action buttons */}
												{/* Action buttons */}
												{!item.isReviewed && (
													<button
														onClick={() => handleMarkReviewed(item._id)}
														className="inline-flex items-center px-3 py-1 bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 text-xs rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-emerald-800/60"
														title="Mark as reviewed"
													>
														<Check className="w-3 h-3" />
													</button>
												)}
												<button
													onClick={() => handleDelete(item._id)}
													className="inline-flex items-center px-3 py-1 bg-red-900/50 text-red-300 border border-red-500/30 text-xs rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-red-800/60"
													title="Delete feedback"
												>
													<Trash2 className="w-3 h-3" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{/* Pagination */}
				{pagination.pages > 1 && (
					<div className="bg-gray-900/30 border-t border-gray-700 px-6 py-4">
						<div className="flex items-center justify-between">
							<div className="text-sm text-gray-400">
								Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
							</div>
							<div className="flex items-center space-x-2">
								<button
									onClick={() => handlePageChange(pagination.page - 1)}
									disabled={pagination.page <= 1}
									className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Previous
								</button>
								<button
									onClick={() => handlePageChange(pagination.page + 1)}
									disabled={pagination.page >= pagination.pages}
									className="btn-secondary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Next
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AdminDashboard;
