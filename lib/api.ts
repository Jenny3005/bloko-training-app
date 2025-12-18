const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export async function fetchProducts() {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
export async function createProduct(data: {
  title: string;
  description: string;
  price: number;
}) {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  return response.json();
}
