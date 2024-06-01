"use server";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
async function getDatas() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/photos?albumId=1"
  );
  if (!res.ok) {
    throw new Error("cannot fetch");
  }
  return res.json();
}

export default async function Home() {
  const data = await getDatas();
  return (
    <main className="container mx-auto p-5">
      <h1 className="text-center font-bold text-3xl mb-5">Gallery</h1>
      <div className="grid grid-cols-5 gap-5">
        {data.map((item) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={item.url}
              title={item.tile}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ height: 60, overflow: "hidden" }}
              >
                {item.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button href={`/selectedImage/${item.id}`} size="small">More Detail</Button>
            </CardActions>
          </Card>
        ))}
        <div className="space"></div>
      </div>
    </main>
  );
}
