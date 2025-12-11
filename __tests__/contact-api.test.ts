/**
 * Unit Test: Contact API Route
 *
 * Tests the contact form API endpoint functionality.
 * Run with: npm test
 *
 * Note: This is a basic test structure. In production, you would:
 * - Mock external services (email, CRM)
 * - Test error handling more thoroughly
 * - Add integration tests
 */

import { POST } from "@/app/api/contact/route"

describe("Contact API Route", () => {
  it("returns success for valid form submission", async () => {
    const mockRequest = {
      json: async () => ({
        name: "Test User",
        email: "test@example.com",
        company: "Test Company",
        message: "This is a test message",
      }),
    } as Request

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it("returns error for missing required fields", async () => {
    const mockRequest = {
      json: async () => ({
        name: "Test User",
        // Missing email and message
      }),
    } as Request

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe("Missing required fields")
  })
})
