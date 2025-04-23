import { useMemo } from 'react';
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

export default function Editor({ value, onChange }) {
  const modules = useMemo(() => {
    return {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        [{ color: [] }, { background: [] }],
      ],
    };
  }, []);

  return (
    <div className={styled['editor']}>
      <h2 className={styled['editor__title']}>내용을 입력해 주세요</h2>
      <div className={styled['editor__box']}>
        <ReactQuill
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
