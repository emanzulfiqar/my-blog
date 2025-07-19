import React, {
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = forwardRef(
  ({ value, onChange, placeholder = "Write your blog post content...", className = "" }, ref) => {
    const quillRef = useRef();

    useImperativeHandle(ref, () => ({
      getEditor: () => quillRef.current?.getEditor(),
      focus: () => quillRef.current?.focus(),
    }));

    const modules = useMemo(
      () => ({
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "blockquote", "code-block"],
          ["clean"],
        ],
      }),
      []
    );

    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "color",
      "background",
      "align",
      "link",
      "blockquote",
      "code-block",
    ];

    return (
      <div className={className}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="min-h-[200px]"
        />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";

RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default RichTextEditor;
