/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const upiHolderName: string = "";
const upiId: string = "";
const email: string = "";

const Page: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>(null);

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const data = params.get("data");

    if (data) {
      try {
        const decodedData = decodeURIComponent(data);
        const parsedData = JSON.parse(decodedData);
        setJsonData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
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
      <div className="text-center mb-6">
        <h2 className="text-2xl mb-4 ">
          Amount to be paid:{" "}
          <span className="text-orange-600">
            ₹{jsonData?.total_amount || 0}
          </span>
        </h2>
        <h3 className="text-lg font-semibold mb-4">Generated QR Code:</h3>
        <div className="bg-gray-800 p-5 inline-block rounded-lg">
          <QRCodeSVG value={getQRCodeValue()} size={250} />
        </div>
        <p className="text-sm mt-2">Scan the QR code with your device.</p>
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
        <Link href={"/register/success"}>
          <button
            type="button"
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded capitalize"
          >
            finish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
