"use client";

import { Card, CardContent } from "@/components/ui/card";
import LeftPart from "@/components/website/LeftPart";
import RightPart from "@/components/website/RightPart";

import { AUCTIONS, BASE_URL, PRICES } from "@/server/Api";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

async function fetchWebsite(id: string) {
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch website");
    }

    const website = await response.json();
    return website.data;
  } catch (error) {
    console.error("Error fetching Website:", error);
    throw error;
  }
}

async function fetchPrice(id: string) {
  try {
    const response = await fetch(`${BASE_URL}${AUCTIONS}/${id}${PRICES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch price");
    }

    const price = await response.json();
    return price.data;
  } catch (error) {
    console.error("Error fetching Price:", error);
    throw error;
  }
}

const Projector = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [price, setPrice] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [websiteData, priceData] = await Promise.all([
        fetchWebsite(id as string),
        fetchPrice(id as string),
      ]);
      setData(websiteData);
      setPrice(priceData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* right part */}
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-6">
              <RightPart data={data} />
            </CardContent>
          </Card>
          {/* left part */}
          <Card className="flex items-center justify-center overflow-hidden shadow-lg">
            <CardContent className="w-full p-6">
              <LeftPart price={price[0]} data={data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Projector;
