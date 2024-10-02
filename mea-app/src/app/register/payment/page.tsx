/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PaymentData {
  total_amount: number;
  upiHolderName?: string;
  upiId?: string;
}

const upiHolderName: string = "Phantasm'25"; 
const upiId: string = "gracelincoln16@oksbi";
const email: string = "gracelincoln16@gmail.com"; 

const Page: React.FC = () => {
  const [jsonData, setJsonData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const data = params.get("data");

    if (data) {
      try {
        const decodedData = decodeURIComponent(data);
        const parsedData = JSON.parse(decodedData);
        setJsonData(parsedData);
      } catch (err) {
        console.error("Error parsing JSON data:", err);
        setError("Failed to load payment details. Please try again.");
      }
    }
  }, []);

  const getQRCodeValue = () => {
    const amount = jsonData?.total_amount || 0;
    const name = upiHolderName || jsonData?.upiHolderName || "Default Name";
    const id = upiId || jsonData?.upiId || "default@upi";

    let upiUrl = `upi://pay?`;

    if (id) upiUrl += `pa=${encodeURIComponent(id)}`;
    if (name) upiUrl += `&pn=${encodeURIComponent(name)}`;
    if (amount > 0) upiUrl += `&am=${encodeURIComponent(amount)}`;
    upiUrl += `&cu=INR`;

    return upiUrl;
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-4">
      {error ? (
        <div className="text-red-500 text-lg">{error}</div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h2 className="text-2xl mb-4">
              Amount to be paid:{" "}
              <span className="text-orange-600">₹{jsonData?.total_amount || 0}</span>
            </h2>
            <h3 className="text-lg font-semibold mb-4">Generated QR Code:</h3>
            <div className="bg-gray-800 p-5 inline-block rounded-lg">
              <QRCodeSVG value={getQRCodeValue()} size={250} />
            </div>
            <p className="text-sm mt-2">Scan the QR code with your device.</p>
          </div>

          {/* Pay Now Button with UPI Symbol */}
          <div className="text-center mt-6">
            <a
              href={getQRCodeValue()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              style={{ textDecoration: 'none' }}
            >
              {/* UPI Symbol (you can replace with a UPI logo image if available) */}
              <img
                src="/assests/upi_logo.webp"
                alt="UPI Logo"
                className="w-6 h-6 mr-2"
              />
              Pay Now
            </a>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg mb-2">
              After making the payment, please send a screenshot of the transaction
              receipt along with your transaction ID to the following email:
            </p>
            <p className="text-lg font-semibold text-orange-600">{email}</p>
            <p className="text-sm mt-2">
              Include your payment details and contact information for verification.
              We will get in touch with you within one day.
            </p>
          </div>

          <div className="mt-8">
            <Link href="/register/success">
              <button
                type="button"
                className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded capitalize"
              >
                Finish
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
