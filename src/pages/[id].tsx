import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css"

interface Post {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
}

interface PostProps {
  itemData: Post;
}

export default function PostPage({ itemData }: PostProps) {
  return (
    <div className={styles.itemdiv}>
      <Link href="/">
        <ArrowBack className={styles.back} />
      </Link>
      <Image
        src={itemData.image}
        alt={itemData.title}
        width= "300"
        height = "500"
        className={styles.imagesize}
      />
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={1}
        className={styles.gridone}
      >
        <Grid item xs={1} className={styles.gridtwo}>
          <h3 className={styles.titletext}>{itemData.title}</h3>
        </Grid>
        <Grid item xs={1} className={styles.gridthree}>
          <p className={styles.paragraph}>
            <strong>Description: </strong>
            {itemData.description}
          </p>
          <p className={styles.paragraph}>
            <strong>Category: </strong>
            {itemData.category}
          </p>
          <p className={styles.paragraph}>
            <strong>Price: </strong>
            {`$${itemData.price}`}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  const posts = res.data;
 const paths = posts.map((post: Post) => ({
   params: { id: post.id.toString() },
 }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const id = params?.id;
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
   const itemData = res.data;
  return {
    props: {
     itemData,
    },
  };
};