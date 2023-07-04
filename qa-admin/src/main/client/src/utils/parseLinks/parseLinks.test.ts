import {describe, expect, it} from "vitest"
import {parseLinks} from "./parseLinks";

const aClasses = '\"text-link-foreground hover:text-link-foreground/80\"'

describe("parseLinks", () => {
    it.each([
        [
            "losos karas https://volpi.ru/sveden/education",
            `losos karas <a href="https://volpi.ru/sveden/education" class=${aClasses}>volpi.ru/sveden/education</a>`
        ],
        [
            "https://volpi.ru/sveden/education losos karas",
            `<a href="https://volpi.ru/sveden/education" class=${aClasses}>volpi.ru/sveden/education</a> losos karas`
        ],
        [
            "https://volpi.ru/losos/karas",
            `<a href="https://volpi.ru/losos/karas" class=${aClasses}>volpi.ru/losos/karas</a>`
        ],
        [
            "sdlkf sdf ksa https://volpi.ru/losos/karas asdlfk",
            `sdlkf sdf ksa <a href="https://volpi.ru/losos/karas" class=${aClasses}>volpi.ru/losos/karas</a> asdlfk`
        ],
        [
            "some big link vk.com/fjhasdkjfhajksdhfkadshkfhasjdkhfjkashdfkhkajsdfhasjkdhfkjashdjkfhaksjhdfkjhasdhfkjahsdkfljhaskjdhfkjhasd",
            `some big link <a href="https://vk.com/fjhasdkjfhajksdhfkadshkfhasjdkhfjkashdfkhkajsdfhasjkdhfkjashdjkfhaksjhdfkjhasdhfkjahsdkfljhaskjdhfkjhasd" class=${aClasses}>vk.com/fjhasdkjfhajksdhfkadshkfhasjdkhfj...</a>`
        ],
        [
            "andrew-semyonov.vercel.app",
            `<a href="https://andrew-semyonov.vercel.app" class=${aClasses}>andrew-semyonov.vercel.app</a>`

        ]
    ])("text: '%s' should return '%s'", (text: string, expected: string) => {
        expect(parseLinks(text)).toBe(expected)
    });

    it.each([
        [
            '<div>This is a <span>sample</span> text with a <script>alert("Hello");</script> script tag.</div>',
            '&lt;div&gt;This is a &lt;span&gt;sample&lt;/span&gt; text with a  script tag.&lt;/div&gt;',
        ],
        [
            '<p>This is a paragraph with <strong>strong</strong> and <em>emphasized</em> text.</p>',
            '&lt;p&gt;This is a paragraph with &lt;strong&gt;strong&lt;/strong&gt; and &lt;em&gt;emphasized&lt;/em&gt; text.&lt;/p&gt;',
        ],
        [
            '<h1>This is a heading</h1>',
            '&lt;h1&gt;This is a heading&lt;/h1&gt;',
        ],
        [
            '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
            '&lt;ul&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;li&gt;Item 2&lt;/li&gt;&lt;li&gt;Item 3&lt;/li&gt;&lt;/ul&gt;',
        ],
        [
            '<img src="image.jpg" alt="Image">',
            '&lt;img alt="Image" src="image.jpg"&gt;',
        ],
    ])("should correctly parse HTML tags and remove script tags", (text, expected) => {
        expect(parseLinks(text)).toBe(expected);
    });


    it("should correctly parse other HTML tags and remove script tags", () => {
        const text = '<div>This is a <span>sample</span> text with a <script>alert("Hello");</script> script tag.</div>';
        const expected = '&lt;div&gt;This is a &lt;span&gt;sample&lt;/span&gt; text with a  script tag.&lt;/div&gt;';
        expect(parseLinks(text)).toBe(expected);
    });


    it("should correctly parse plain text without any tags", () => {
        const text = "This is a plain text without any HTML tags.";
        const expected = "This is a plain text without any HTML tags.";
        expect(parseLinks(text)).toBe(expected);
    });


})