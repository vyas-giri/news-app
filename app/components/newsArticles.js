"use client";
import React from 'react'
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection } from "firebase/firestore";

function NewsArticles() {
    const apiResponse = fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=100`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWSAPI_KEY}`
          },
        },
      )
      const apiJson = apiResponse.json();
      const { articles } = apiJson;


  return (
    <div>
        <button className="">
      <img width="50" height="50" src="https://img.icons8.com/plasticine/100/grid.png" alt="grid"/>
      </button>
    <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {articles.map((article, index) => {
        if (article.title !== "[Removed]") {
          return (
            <div className="p-4 md:w-1/3" key={index}>
        <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden">
          <button className="absolute rounded-full border-2 hover:bg-red-500" onClick={
            async (author, title, description, url,urlToImage) => {
              try{
                const docRef = await addDoc(collection(db, "newsArticles"), {
                  author: article.author,
                  title: article.title,
                  description: article.description,
                  url: article.url,
                  urlToImage: article.urlToImage
                })
              } catch (error) {

              }
            }
          }>
          <img width="40" height="40" src="https://img.icons8.com/cotton/64/like--v1.png" alt="like--v1"/>
          </button>
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={article.urlToImage} alt="image" width={720} height={400} />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{article.author}</h2>
            <h1 className="title-font text-lg font-medium text-white mb-3">{article.title}</h1>
            <p className="leading-relaxed mb-3">{article.description}</p>
            <div className="flex items-center flex-wrap ">
              <a className="text-blue-400 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer" href={article.url}>Read More
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
          )
        } else {
          return null;
        }
      })
      }
    </div>
  </div>
    </div>
  )
}

export default NewsArticles