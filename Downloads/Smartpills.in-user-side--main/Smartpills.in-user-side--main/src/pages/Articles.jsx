import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Article from "../components/Article";
import axiosClient from "../components/AxiosClient";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const token = localStorage.getItem('token');
        try {
            if (!token) throw new Error("Token not found");

            const response = await axiosClient.post("/blogs/get_blogs/1/10", null, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setArticles(response.data || []);
            } else {
                throw new Error("Failed to fetch articles");
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-20 text-center">
                <h1 className="font-bold text-4xl mb-5">
                    Healthcare Useful Articles
                </h1>
                <p className="text-gray-500 text-2xl mb-10">
                    From healthcare providers, pharmacists, and journalists you can trust.
                </p>
                <div className="flex flex-col items-center space-y-6">
                    {articles.map((article) => (
                        <Article
                            key={article.id}
                            title={article.title}
                            img={article.image_url}
                            link={article.id}
                            bio={article.description}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Articles;
