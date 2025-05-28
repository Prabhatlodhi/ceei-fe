import { Users, UserCheck, MessageSquare } from "lucide-react";
import "../styles/Header.css";

function Header({ currentView, setCurrentView }) {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 glass-header">
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
					{/* Logo and Title */}
					<div className="flex items-center space-x-3">
						<div>
							<h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
								Employee Feedback Portal
							</h1>
						</div>
					</div>

					{/* View Toggle */}
					<div className="flex items-center space-x-2">
						<span className="text-sm font-medium text-gray-300 hidden sm:block">Switch View:</span>
						<div className="flex bg-gray-900/50 border border-gray-700 rounded-2xl p-1 backdrop-blur-sm">
							<button
								onClick={() => setCurrentView("employee")}
								className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
									currentView === "employee"
										? "bg-gradient-to-r from-purple-600 to-violet-600 text-white transform scale-105"
										: "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
								}`}
							>
								<Users className="w-4 h-4" />
								<span className="hidden sm:inline">Employee</span>
							</button>
							<button
								onClick={() => setCurrentView("admin")}
								className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
									currentView === "admin"
										? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white transform scale-105"
										: "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
								}`}
							>
								<UserCheck className="w-4 h-4" />
								<span className="hidden sm:inline">Admin</span>
							</button>
						</div>
					</div>
				</div>

				{/* Current View Indicator */}
				{/* Current View Indicator */}
				<div className="mt-4 flex items-center justify-end space-x-2">
					<div
						className={`w-2 h-2 rounded-full ${
							currentView === "employee"
								? "bg-gradient-to-r from-purple-500 to-violet-500"
								: "bg-gradient-to-r from-emerald-500 to-teal-500"
						} animate-pulse`}
					></div>
					<span className="text-sm text-gray-300">
						{currentView === "employee" ? "Employee View" : "Admin Dashboard"}
					</span>
				</div>
			</div>
		</header>
	);
}

export default Header;
