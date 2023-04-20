import { GetStaticProps } from "next";
import Link from "next/link";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({
  items,
}: {
  items: {
    id: number;
    title: string;
    image: string;
    price: number;
  }[]
}) {
  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" className={styles.topography}>
            My App
          </Typography>
          <IconButton color="inherit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={styles.carddiv}>
        {items.map(({ id, title, image, price }) => (
          <Card key={id} className={styles.cardfull}>
            <Link href={`/${id}`}>
              <CardContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Image src={image} alt={title} width="200" height="250" />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{title}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{`$ ${price}`}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
        const items = response.data;
  
  return {
    props: {
      items,
    },
  };
};