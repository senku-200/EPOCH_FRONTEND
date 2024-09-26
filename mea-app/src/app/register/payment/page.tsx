/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

const UPI_HOLDER_NAME = "TAMILARASAN";
const UPI_ID = "9363123183@ptsbi";
interface Props {
  totalAmount: Number;
}
const page: React.FC<Props> = ({ totalAmount }) => {
  const [image, setImage] = useState<File | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  return (
    <div>
      {" "}
      {
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Generated QR Code:</h3>
          <div className="bg-slate-600 p-5">
            <QRCodeSVG
              value={`upi://pay?pa=${UPI_ID}&pn=${UPI_HOLDER_NAME}&am=${totalAmount}&cu=INR&aid=uGICAgMCA4ujOXQ`}
              size={250}
            />
          </div>
          <p className="text-sm mt-2">Scan the QR code with your device.</p>
        </div>
      }
      {/* Image Upload Section */}
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default page;
