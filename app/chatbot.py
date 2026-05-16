import os

from dotenv import load_dotenv

from app.retriever import search_assessments

load_dotenv()

from google import genai

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def is_vague(text):

    vague_phrases = [
        "need assessment",
        "need test",
        "hiring",
        "developer",
        "engineer",
        "assessment"
    ]

    text = text.lower()

    # short queries
    if len(text.split()) <= 3:
        return True

    matches = sum(
        phrase in text
        for phrase in vague_phrases
    )

    return matches >= 1 and len(text.split()) < 6


def is_off_topic(text):

    off_topics = [
        "legal advice",
        "politics",
        "movie",
        "recipe",
        "cricket"
    ]

    text = text.lower()

    return any(
        topic in text
        for topic in off_topics
    )

def is_comparison_query(text):

    comparison_words = [
        "difference",
        "compare",
        "vs",
        "versus"
    ]

    text = text.lower()

    return any(
        word in text
        for word in comparison_words
    )
def is_refinement_query(text):

    refinement_words = [
        "add",
        "also",
        "include",
        "instead",
        "change"
    ]

    text = text.lower()

    return any(
        word in text
        for word in refinement_words
    )

def generate_reply(messages):

    last_message = messages[-1]["content"]

    # OFF TOPIC
    if is_off_topic(last_message):

        return {
            "reply": (
                "I can only help with "
                "SHL assessment recommendations."
            ),
            "recommendations": [],
            "end_of_conversation": False
        }
    # REFINEMENT QUERY
    if is_refinement_query(last_message):

        refined_results = search_assessments(
            last_message,
            top_k=5
        )

        recommendations = []

        for item in refined_results:

            recommendations.append({
                "name": item["name"],
                "url": item["url"],
                "test_type": item["test_type"]
            })

        return {
            "reply": (
                "I updated the recommendations "
                "based on your new requirements."
            ),
            "recommendations": recommendations,
            "end_of_conversation": False
        }

    # VAGUE QUERY
    if is_vague(last_message):

        return {
            "reply": (
                "Can you share more details "
                "about the role, seniority, "
                "and required skills?"
            ),
            "recommendations": [],
            "end_of_conversation": False
        }
    # COMPARISON QUERY
    if is_comparison_query(last_message):

        return {
            "reply": (
                "OPQ focuses on personality and workplace behavior, "
                "while SJT evaluates decision-making in workplace situations."
            ),
            "recommendations": [],
            "end_of_conversation": False
        }

    # SEARCH
    results = search_assessments(
        last_message,
        top_k=5
    )

    recommendations = []

    for item in results:

        recommendations.append({
            "name": item["name"],
            "url": item["url"],
            "test_type": item["test_type"]
        })

    return {
        "reply": (
            f"I found {len(recommendations)} "
            f"relevant SHL assessments "
            f"for your needs."
        ),
        "recommendations": recommendations,
        "end_of_conversation": True
    }