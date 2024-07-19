import { makeRequest } from "./makeRequest";

export function getReviews(pageNum: number) {
  return makeRequest(`/reviews?skip=${(pageNum - 1) * 10}`);
}
export function addReview(body) {
  return makeRequest("/reviews", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function deleteReview(id: string) {
  return makeRequest(`/reviews/${id}`, { method: "DELETE" });
}

export function getReview(id: string) {
  return makeRequest(`/reviews/${id}`, { method: "GET" });
}

export function updateReview(id: string, body) {
  return makeRequest(`/reviews/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
