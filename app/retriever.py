import json
import faiss
import numpy as np

from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

with open("data/catalog.json", "r") as f:
    catalog = json.load(f)

texts = [
    item["name"] + " " + item["description"]
    for item in catalog
]

embeddings = model.encode(texts)

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(np.array(embeddings))


def search_assessments(query, top_k=5):

    query_embedding = model.encode([query])

    distances, indices = index.search(
        np.array(query_embedding),
        top_k
    )

    results = []

    for idx in indices[0]:
        results.append(catalog[idx])

    return results