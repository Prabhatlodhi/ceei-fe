const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Helper function to handle API responses
const handleResponse = async (response) => {
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || `HTTP error! status: ${response.status}`);
	}

	return data;
};

// Helper function to build query string
const buildQueryString = (params) => {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== "" && value !== null && value !== undefined) {
			searchParams.append(key, value);
		}
	});

	return searchParams.toString();
};

// Submit new feedback
export const submitFeedback = async (feedbackData) => {
	try {
		const response = await fetch(`${API_BASE_URL}/feedback`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(feedbackData),
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("Error submitting feedback:", error);
		throw error;
	}
};

// Get all feedback with optional filters
export const getAllFeedback = async (filters = {}) => {
	try {
		const queryString = buildQueryString(filters);
		const url = `${API_BASE_URL}/feedback${queryString ? `?${queryString}` : ""}`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("Error fetching feedback:", error);
		throw error;
	}
};

// Get feedback by ID
export const getFeedbackById = async (id) => {
	try {
		const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("Error fetching feedback by ID:", error);
		throw error;
	}
};

// Mark feedback as reviewed
export const markAsReviewed = async (id) => {
	try {
		const response = await fetch(`${API_BASE_URL}/feedback/${id}/reviewed`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("Error marking feedback as reviewed:", error);
		throw error;
	}
};

// Delete feedback
export const deleteFeedback = async (id) => {
	try {
		const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		return await handleResponse(response);
	} catch (error) {
		console.error("Error deleting feedback:", error);
		throw error;
	}
};

// Get feedback statistics
// export const getFeedbackStats = async () => {
// 	try {
// 		const response = await fetch(`${API_BASE_URL}/feedback/stats`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});

// 		return await handleResponse(response);
// 	} catch (error) {
// 		console.error("Error fetching feedback stats:", error);
// 		throw error;
// 	}
// };

// Filter feedback by category
export const getFeedbackByCategory = async (category) => {
	return getAllFeedback({ category });
};

// Filter feedback by review status
export const getFeedbackByReviewStatus = async (reviewed) => {
	return getAllFeedback({ reviewed });
};

// Get paginated feedback
export const getPaginatedFeedback = async (page = 1, limit = 10) => {
	return getAllFeedback({ page, limit });
};

// Combined filter function for complex queries
export const getFilteredFeedback = async (filters) => {
	return getAllFeedback(filters);
};

// Export all available categories for consistency
export const FEEDBACK_CATEGORIES = ["Work Environment", "Leadership", "Growth", "Others"];

// Export sort options
export const SORT_OPTIONS = [
	{ value: "-submissionTime", label: "Newest First" },
	{ value: "submissionTime", label: "Oldest First" },
	{ value: "category", label: "Category A-Z" },
	{ value: "-category", label: "Category Z-A" },
	{ value: "isReviewed", label: "Unreviewed First" },
	{ value: "-isReviewed", label: "Reviewed First" },
];

// Check API connection
export const checkApiConnection = async () => {
	try {
		const response = await fetch(API_BASE_URL.replace("/api", "/"), {
			method: "GET",
		});

		return response.ok;
	} catch (error) {
		console.error("API connection failed:", error);
		return false;
	}
};
