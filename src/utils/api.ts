const WEBHOOK_URL =
  "https://poovaragan12.app.n8n.cloud/webhook/dashboard";

export async function fetchIncidents() {
  try {
    const response = await fetch(WEBHOOK_URL);

    if (!response.ok) {
      throw new Error("Webhook failed");
    }

    const data = await response.json();

    return data;

  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
