#!/usr/bin/env python3

"""Extracts HTML attribute keywords from MDN docs.
To do this, converts the MDN doc from markdown to HTML, then searches for the "Attributes" and "Deprecated attributes" sections.
Keywords are located in list elements with code tags, which are children of the aforementioned sections.
"""

from typing import Iterator
from bs4 import BeautifulSoup, Tag
from markdown2 import markdown
import os
import argparse


def create_html(markdown_filepath: str) -> str:
    """Converts the given markdown file to HTML and returns the html string."""
    with open(markdown_filepath, "r") as f:
        html = markdown(f.read(), safe_mode="escape")
        return html


def search_code_tag(tag: Tag) -> Tag | None:
    """Recursively searches for a code tag in the given tag. If found, returns the code tag. Otherwise, returns None.
    Skips style related tags and tags that are not code, a, p, strong, or em."""
    if tag.name == "code":
        return tag
    for child in tag.contents:
        if child.get_text() == "\n":
            continue
        if isinstance(child, Tag):
            if child.name in ["a", "p", "strong", "em"]:
                return search_code_tag(child)
            elif child.name == "code":
                return child
            else:
                return None
        else:
            return None


def find_attributes(soup: BeautifulSoup) -> Iterator[tuple[str, Tag]]:
    """Searches for HTML attribute descriptions in the given document.
    These are list elements with code tags that come after the headers "Attributes" and "Deprecated attributes".
    """

    def find_attributes_after(tag: Tag) -> Iterator[tuple[str, Tag]]:
        """Searches for list elements with code tags that are children of the given tag."""
        ul = tag.find_next_sibling("ul")
        if ul is not None:
            assert isinstance(ul, Tag)
            for li in ul.find_all("li", recursive=False):
                code_tag = search_code_tag(li)
                if code_tag is not None:
                    yield code_tag.get_text().strip(), li

    # find h2 element with text "Attributes"
    attributes = soup.find("h2", string="Attributes")
    assert isinstance(attributes, Tag)
    for attr in find_attributes_after(attributes):
        yield attr

    deprecated_attributes = soup.find("h3", string="Deprecated attributes")
    if isinstance(deprecated_attributes, Tag):
        for attr in find_attributes_after(deprecated_attributes):
            yield attr


def find_attribute_keywords(attribute_tag: Tag) -> Iterator[str]:
    """Searches for list elements with code tags that are children of the given attribute_tag."""
    for li in attribute_tag.find_all("li"):
        code_tag = search_code_tag(li)
        if code_tag is not None:
            yield code_tag.get_text().strip()


def get_attributes(tag_name: str, mdn_dir: str) -> dict[str, list[str]]:
    """Returns a dictionary of HTML attributes for the given HTML tag."""
    if tag_name == "h1":
        tag_name = "heading_elements"
    filepath = os.path.join(
        mdn_dir, "files/en-us/web/html/element", tag_name, "index.md"
    )

    html = create_html(filepath)
    soup = BeautifulSoup(html, "html.parser")
    attributes = {}
    for name, tag in find_attributes(soup):
        keywords = list(find_attribute_keywords(tag))
        attributes[name.replace("-", "")] = keywords
    return attributes


def main():
    parser = argparse.ArgumentParser(
        description="Extract HTML attribute keywords from MDN docs"
    )
    parser.add_argument(
        "-i", "--input", help="path to MDN doc file", type=str, required=True
    )
    args = parser.parse_args()
    html = create_html(args.input)
    soup = BeautifulSoup(html, "html.parser")
    for name, tag in find_attributes(soup):
        keywords = list(find_attribute_keywords(tag))
        print(f"{name}: {keywords}")


if __name__ == "__main__":
    main()
