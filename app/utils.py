def is_vague_query(text):

    vague_words = [
        "assessment",
        "test",
        "hiring",
        "developer",
        "engineer"
    ]

    text = text.lower()

    if len(text.split()) < 4:
        return True

    count = sum(word in text for word in vague_words)

    return count <= 1