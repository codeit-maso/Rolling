import { useMemo, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from './Editor.module.scss';

const formats = [
  'bold',
  'italic',
  'underline',
  'list',
  'link',
  'align',
  'color',
  'background',
];

const fontFamilyMap = {
  나눔명조: '"Nanum Myeongjo", serif',
  '나눔손글씨 손편지체': '"Nanum Sonpyeonji Ce", cursive',
  Pretendard: '"Pretendard", sans-serif',
  'Noto Sans': '"Noto Sans", sans-serif',
};

export default function Editor({ value, onChange, font }) {
  const quillRef = useRef();

  const modules = useMemo(() => {
    return {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
      ],
    };
  }, []);

  useEffect(() => {
    const editorRoot = quillRef.current?.editor?.root;
    if (editorRoot) {
      editorRoot.style.fontFamily = fontFamilyMap[font];
      editorRoot.style.fontSize = '18px';
    }
  }, [font]);

  return (
    <div className={styled['editor']}>
      <h2 className={styled['editor__title']}>내용을 입력해 주세요</h2>

      <div className={styled['editor__box']}>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={onChange}
          placeholder="전하고 싶은 메시지를 적어보세요."
        />
      </div>
    </div>
  );
}
