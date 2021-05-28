import "./App.scss";
import { getAlternativeTitles } from "./api/movies";

function App() {
  getAlternativeTitles(550).then((response) => {
    console.log(response);
  });
  return (
    <div className="App">
      <h1>h1. Bootstrap heading</h1>
      <h2>h2. Bootstrap heading</h2>
      <h3>h3. Bootstrap heading</h3>
      <h4>h4. Bootstrap heading</h4>
      <h5>h5. Bootstrap heading</h5>
      <h6>h6. Bootstrap heading</h6>
      <hr />
      <p>
        <a href="https://getbootstrap.com/">You</a> can use the mark tag to{" "}
        <mark>highlight</mark> text.
      </p>
      <p>
        <del>This line of text is meant to be treated as deleted text.</del>
      </p>
      <p>
        <s>This line of text is meant to be treated as no longer accurate.</s>
      </p>
      <p>
        <ins>
          This line of text is meant to be treated as an addition to the
          document.
        </ins>
      </p>
      <p>
        <u>This line of text will render as underlined.</u>
      </p>
      <p>
        <small>This line of text is meant to be treated as fine print.</small>
      </p>
      <p>
        <strong>This line rendered as bold text.</strong>
      </p>
      <p>
        <em>This line rendered as italicized text.</em>
      </p>
      <p>
        <abbr title="attribute">attr</abbr>
      </p>
      <p>
        <abbr title="HyperText Markup Language">HTML</abbr>
      </p>
      <p>
        <pre>
          <code>
            &lt;p&gt;Sample text here...&lt;/p&gt; &lt;p&gt;And another line of
            sample text here...&lt;/p&gt;
          </code>
        </pre>
      </p>
      <p>
        Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text (Windows).
      </p>
      <ul>
        <li>This is a list.</li>
        <li>It appears completely unstyled.</li>
        <li>Structurally, it's still a list.</li>
        <li>However, this style only applies to immediate child elements.</li>
        <li>
          Nested lists:
          <ul>
            <li>are unaffected by this style</li>
            <li>will still show a bullet</li>
            <li>and have appropriate left margin</li>
          </ul>
        </li>
        <li>This may still come in handy in some situations.</li>
      </ul>
    </div>
  );
}

export default App;
