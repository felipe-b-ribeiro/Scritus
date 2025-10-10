import { generateEmbeddings } from "../textEmbeddings.js";
import test_texts from "./../data/test_texts.json" assert { type: "json" };

async function test() {
  const embeddings = await generateEmbeddings(test_texts);
  console.log("Embeddings gerados:", embeddings);
}

test();
