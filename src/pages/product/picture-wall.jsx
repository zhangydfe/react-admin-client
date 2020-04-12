import React, {Component} from 'react';
import {Upload, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * 应用组件
 */


const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class PicturesWall extends Component {

    static propTypes = {
        imgs: PropTypes.array
    }

    constructor(props) {
        super(props);

        let fileList = [];
        const {imgs} = this.props;
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index,
                name: img.name,
                status: 'done',
                url: img.url,
            }));
        }

        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList
        };
    }

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    /**
     * @param file  当前操作的文件
     * @param fileList
     * @returns {*}
     */
    handleChange = ({file, fileList}) => {
        console.info('上传文件：', file, fileList);
        this.setState({fileList})
    }

    /**
     * 获取所有上传文件数组
     */
    getImgs = () => {
        return this.state.fileList;
    }

    render() {
        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="clearfix">
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        );
    }
}
