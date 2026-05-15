import requests
from bs4 import BeautifulSoup
import json

BASE_URL = "https://www.shl.com"

url = "https://www.shl.com/solutions/products/product-catalog/"

headers = {
    "User-Agent": "Mozilla/5.0"
}

response = requests.get(url, headers=headers)

soup = BeautifulSoup(response.text, "html.parser")

catalog = []

seen = set()

# unwanted generic names
bad_titles = {
    "Products",
    "Assessments",
    "Behavioral Assessments",
    "Personality Assessments",
    "Video Interviews",
    "Technical Skills",
    "Cognitive Assessments"
}

for a in soup.find_all("a", href=True):

    title = a.get_text(strip=True)
    href = a["href"]

    if not title:
        continue

    if title in bad_titles:
        continue

    # only assessment links
    if "/products/assessments/" not in href:
        continue

    full_url = (
        BASE_URL + href
        if href.startswith("/")
        else href
    )

    if full_url in seen:
        continue

    seen.add(full_url)

    # detect type
    test_type = "Unknown"

    href_lower = href.lower()

    if "personality" in href_lower:
        test_type = "Personality"

    elif "cognitive" in href_lower:
        test_type = "Cognitive"

    elif "behavioral" in href_lower:
        test_type = "Behavioral"

    elif "technical" in href_lower:
        test_type = "Technical"

    elif "coding" in href_lower:
        test_type = "Coding"

    elif "simulation" in href_lower:
        test_type = "Simulation"

    elif "skills" in href_lower:
        test_type = "Skills"

    elif "job-focused" in href_lower:
        test_type = "Job-Focused"

    elif "development" in href_lower:
        test_type = "Development"

    catalog.append({
        "name": title,
        "url": full_url,
        "description": title,
        "test_type": test_type
    })

with open("data/catalog.json", "w") as f:
    json.dump(catalog, f, indent=2)

print(f"Saved {len(catalog)} assessments")