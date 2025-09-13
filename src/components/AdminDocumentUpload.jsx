import React, { useState } from "react";
import { getFormInitialData } from "./form";

function AdminDocumentUpload() {
  const [form, setForm] = useState(getFormInitialData());

  const handleChange = (field) => (e) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const checkValidData = () => {
    const { tenant_id, email, faq } = form;
    if (!tenant_id || !email || !faq) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValidData()) {
      alert("Form submitted");
      setForm(getFormInitialData());
    } else {
      alert("All fields are required");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "800px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "32px",
        }}
      >
        <h2
          style={{
            margin: "0 0 24px 0",
            fontSize: "24px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Admin Document Upload
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Tenant ID */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Tenant ID
            </label>
            <input
              type="text"
              value={form.tenant_id}
              onChange={handleChange("tenant_id")}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Admin Email */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              Admin Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* FAQ */}
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              FAQ
            </label>
            <textarea
              rows="15"
              value={form.faq}
              onChange={handleChange("faq")}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "16px",
                boxSizing: "border-box",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#1976d2")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px 24px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1565c0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminDocumentUpload;
