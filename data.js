// 10 MCQs per subject
const quizData = {
  html: [
    { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: 0 },
    { q: "Choose the correct HTML element for the largest heading:", options: ["<heading>", "<h1>", "<h6>", "<head>"], answer: 1 },
    { q: "What is the correct HTML element for inserting a line break?", options: ["<lb>", "<break>", "<br>", "<line>"], answer: 2 },
    { q: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], answer: 0 },
    { q: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?", options: ["src", "title", "alt", "longdesc"], answer: 2 },
    { q: "Which HTML element defines the title of a document?", options: ["<meta>", "<head>", "<title>", "<header>"], answer: 2 },
    { q: "How can you make a numbered list?", options: ["<ul>", "<ol>", "<dl>", "<list>"], answer: 1 },
    { q: "Which element is used to specify a footer for a document or section?", options: ["<section>", "<footer>", "<bottom>", "<aside>"], answer: 1 },
    { q: "Which input type defines a slider control?", options: ["range", "slider", "controls", "scroll"], answer: 0 },
    { q: "Which HTML element is used to define important text?", options: ["<strong>", "<i>", "<em>", "<imp>"], answer: 0 }
  ],
  css: [
    { q: "Which property is used to change the text color of an element?", options: ["font-color", "color", "text-color", "fgcolor"], answer: 1 },
    { q: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 },
    { q: "How do you select an element with id 'demo'?", options: ["demo", ".demo", "#demo", "*demo"], answer: 2 },
    { q: "Which property is used for creating space between the element's border and content?", options: ["margin", "padding", "spacing", "gap"], answer: 1 },
    { q: "Which unit is relative to the root element's font-size?", options: ["em", "rem", "px", "%"], answer: 1 },
    { q: "Which property makes a flex container?", options: ["display: grid", "display: block", "display: flex", "position: flex"], answer: 2 },
    { q: "How do you write a media query for max-width 600px?", options: ["@media (width <= 600px)", "@media (max-width:600px)", "@when width < 600px", "@screen <600px"], answer: 1 },
    { q: "Which property changes the background color?", options: ["bgcolor", "background-color", "color", "background"], answer: 1 },
    { q: "What does 'justify-content: center' do in flexbox?", options: ["Centers items along cross axis", "Centers items along main axis", "Aligns items to start", "Aligns items to end"], answer: 1 },
    { q: "Which property creates a grid with 3 equal columns?", options: ["grid-template: 3", "grid-columns: 3", "grid-template-columns: repeat(3, 1fr)", "columns: 3 equal"], answer: 2 }
  ],
  javascript: [
    { q: "Which keyword declares a variable?", options: ["var", "let", "const", "All of the above"], answer: 3 },
    { q: "Which operator is used for strict equality?", options: ["=", "==", "===", "!=="], answer: 2 },
    { q: "How do you write a comment in JavaScript?", options: ["<!-- comment -->", "// comment", "/* comment */", "Both // and /* */"], answer: 3 },
    { q: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: 0 },
    { q: "What is NaN in JavaScript?", options: ["Not a Number", "Negative a Number", "New a Number", "Null and Nil"], answer: 0 },
    { q: "Which function is used to parse a string into an integer?", options: ["Number()", "parseInt()", "toInteger()", "parse()"], answer: 1 },
    { q: "Which built-in method calls a function for each element in an array?", options: ["while()", "foreach()", "forEach()", "loop()"], answer: 2 },
    { q: "How do you create a function in JavaScript?", options: ["function myFunction()", "create myFunction()", "def myFunction()", "func myFunction()"], answer: 0 },
    { q: "Which statement is used to stop a loop?", options: ["stop", "exit", "break", "halt"], answer: 2 },
    { q: "Which method converts JSON string to an object?", options: ["JSON.toObject()", "JSON.parse()", "JSON.stringify()", "parseJSON()"], answer: 1 }
  ]
};
