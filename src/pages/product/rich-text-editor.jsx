import React, {Component} from 'react';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from "prop-types";

/**
 * 应用组件
 */
export default class RichTextEditor extends Component {

    static propTypes = {
        value: PropTypes.string
    }

    constructor(props) {
        super(props);
        const {value} = this.props;
        if (value) {
            const contentBlock = htmlToDraft(value);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState
                };
            }
        } else {
            this.state = {
                editorState: EditorState.createEmpty()//创建一个没有内容的编辑对象
            }
            ;
        }

    }

    /**
     * 编辑改变是回调
     * @param editorState
     */
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://api.imgur.com/3/image');
                const data = new FormData();
                data.append('image', file);
                xhr.send(data);
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);
                    const url = response.data.url;
                    const link = {data: {link: url}}
                    resolve(link);
                });
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText);
                    reject(error);
                });
            }
        );
    }

    getValue = () => {
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                editorState={editorState}
                editorStyle={{border: '1px solid black', minHeight: 200, paddingLeft: 10}}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: {uploadCallback: this.uploadImageCallBack, alt: {present: true, mandatory: true}},
                }}
            />
        );
    }
}
/*
<textarea
    disabled
    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
 />
* */
