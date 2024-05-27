import SliderForThree from "../../../layouts/sliderForThree/SliderForThree";
import NewsCard from "../../../common/newsCard/NewsCard";
import { NewsType } from "../../../../types/NewsType";
import { useState, useEffect } from "react";
import { fetchPosts, postNewsData } from "../../../../utils/postApi";

const NewSlider = () => {
  const [data, setData] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postLink, setPostLink] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchPosts();
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Posts:", error);
        setError("Ошибка при загрузке советов");
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const createPost = () => {
    const postData = {
      admin_id: 3,
      post_name: postTitle,
      post_text: postText,
      org_id: 2,
      post_link: postLink,
    };

    postNewsData(postData)
      .then((res) => {
        console.log("Новость успешно создана:", res.data);
      })
      .catch((error) => {
        console.error("Ошибка при создании новости:", error);
      });
    window.location.reload();
  };

  const modalContent = (
    <div style={{ maxWidth: "500px" }}>
      <h2>Создать новость</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>
          Заголовок поста
          <input
            type="text"
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Текст поста
          <input
            type="text"
            value={postText}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Ссылка на картинку для поста
          <input
            type="text"
            value={postLink}
            onChange={(e) => {
              setPostLink(e.target.value);
            }}
          ></input>
        </label>
        <button
          style={{
            maxWidth: "100px",
            fontSize: "16px",
            backgroundColor: "var(--darkTextColor)",
            color: "white",
            padding: "5px",
            border: "none",
            borderRadius: "10px",
          }}
          onClick={() => createPost()}
        >
          Создать
        </button>
      </div>
    </div>
  );

  const items = data.map((news) => <NewsCard key={news.id} props={news} />);
  const title = "Новости из мира донорства";
  const section = "new";
  const buttonText = "Создать новость";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <SliderForThree
      elems={items}
      title={title}
      sectionName={section}
      buttonText={buttonText}
      modalContent={modalContent}
    />
  );
};

export default NewSlider;
