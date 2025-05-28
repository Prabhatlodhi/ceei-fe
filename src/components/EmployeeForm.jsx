import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { submitFeedback } from "../services/api";

function EmployeeForm() {
	const [formData, setFormData] = useState({
		feedback: "",
		category: "",
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState(""); // 'success' or 'error'

	const categories = ["Work Environment", "Leadership", "Growth", "Others"];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		console.log("handleSubmit called");
		e.preventDefault();

		console.log("Form data:", formData);

		if (!formData.feedback.trim() || !formData.category) {
			console.log("Validation failed: missing fields");
			setMessage("Please fill in all fields");
			setMessageType("error");
			return;
		}

		if (formData.feedback.trim().length < 10) {
			console.log("Validation failed: feedback too short");
			setMessage("Feedback must be at least 10 characters long");
			setMessageType("error");
			return;
		}

		console.log("Starting API call...");
		setLoading(true);
		setMessage("");

		try {
			console.log("Making real API call");
			await submitFeedback(formData);
			console.log("API call successful");
			setMessage("Thank you! Your feedback has been submitted successfully.");
			setMessageType("success");
			setFormData({ feedback: "", category: "" });
		} catch (error) {
			console.log("API call failed:", error);
			setMessage(error.message || "Failed to submit feedback. Please try again.");
			setMessageType("error");
		} finally {
			console.log("API call completed, setting loading to false");
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto min-h-screen p-4 mt-4">
			{/* Hero Section */}
			<div className="text-center mb-4">
				<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
					Share Your Feedback
				</h2>
				<p className="text-gray-400 text-base md:text-s max-w-2xl mx-auto leading-relaxed">
					Your voice matters! Help us create a better workplace by sharing your honest feedback. All
					submissions are anonymous and confidential.
				</p>
			</div>

			{/* Form Card */}
			<div className="bg-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
				<div className="p-6 space-y-5">
					{/* Category Selection */}
					<div>
						<label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
							Feedback Category *
						</label>
						<select
							id="category"
							name="category"
							value={formData.category}
							onChange={handleInputChange}
							className="w-full px-4 py-3 bg-gray-900 border border-gray-500 text-gray-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200"
							required
						>
							<option value="">Select a category</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>

					{/* Feedback Text */}
					<div>
						<label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
							Your Feedback *
						</label>
						<textarea
							id="feedback"
							name="feedback"
							value={formData.feedback}
							onChange={handleInputChange}
							rows={5}
							className="w-full px-4 py-3 bg-gray-900 border border-gray-500 text-gray-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-20 transition-all duration-200 resize-none"
							placeholder="Share your thoughts, suggestions, or concerns... (minimum 10 characters)"
							required
							minLength={10}
							maxLength={1000}
						/>
						<div className="flex justify-between items-center mt-2">
							<p className="text-xs text-gray-500">Minimum 10 characters required</p>
							<p
								className={`text-xs ${
									formData.feedback.length > 900 ? "text-orange-400" : "text-gray-500"
								}`}
							>
								{formData.feedback.length}/1000
							</p>
						</div>
					</div>

					{/* Message Display */}
					{message && (
						<div
							className={`p-3 rounded-xl flex items-center space-x-3 border ${
								messageType === "success"
									? "bg-emerald-900/30 border-emerald-500/30"
									: "bg-red-900/30 border-red-500/30"
							}`}
						>
							{messageType === "success" ? (
								<CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
							) : (
								<AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
							)}
							<p className={`text-sm ${messageType === "success" ? "text-emerald-300" : "text-red-300"}`}>
								{message}
							</p>
						</div>
					)}

					{/* Submit Button */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
						<div className="flex items-center space-x-2 text-sm text-gray-400">
							<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
							<span>Anonymous submission</span>
						</div>

						<button
							type="button"
							onClick={handleSubmit}
							disabled={loading || !formData.feedback.trim() || !formData.category}
							className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-violet-700 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
						>
							{loading ? (
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									<span>Submitting...</span>
								</>
							) : (
								<>
									<Send className="w-4 h-4" />
									<span>Submit Feedback</span>
								</>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Additional Info */}
			<div className="mt-5 grid md:grid-cols-2 gap-4">
				<div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl">
					<h4 className="font-semibold text-purple-300 mb-1 text-sm">Privacy Guaranteed</h4>
					<p className="text-xs text-gray-400">
						Your feedback is completely anonymous. We cannot trace submissions back to individual employees.
					</p>
				</div>
				<div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl">
					<h4 className="font-semibold text-emerald-300 mb-1 text-sm">We Value Your Input</h4>
					<p className="text-xs text-gray-400">
						Every piece of feedback helps us improve our workplace culture and employee experience.
					</p>
				</div>
			</div>
		</div>
	);
}

export default EmployeeForm;
