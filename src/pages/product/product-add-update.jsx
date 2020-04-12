import React, {Component} from 'react';
import {Card, Form, Input, Cascader, Button} from 'antd';
import {LeftCircleTwoTone} from '@ant-design/icons';

import LinkButton from "../../components/link-button";
import PictureWall from './picture-wall';
import RichTextEditor from './rich-text-editor';

const {Item} = Form;
const {TextArea} = Input;

/**
 * 产品新增、修改应用组件
 */
export default class ProductAddUpdate extends Component {

    constructor(props) {
        super(props);
        //创建用来保存ref标识的标签对象容器
        this.formRef = React.createRef();
        this.pwRef = React.createRef();
        this.rtRef = React.createRef();

        this.state = {
            options: []
        }
    }

    /**
     * 提交按钮
     */
    handleSubmit = () => {
        this.formRef.current.validateFields().then(values => {
            console.info(values);
            console.info(this.pwRef.current.getImgs());//获取照片墙内容
            console.info(this.rtRef.current.getValue());//获取富文本框内容

            //this.props.history.goBack();
        }).catch(errInfo => {
            console.info(errInfo);
        })
    };

    /**
     * 自定义价格校验
     */
    validatePrice = (rule, value) => {
        if (value * 1 > 0 && value * 1 < 10000) {
            return Promise.resolve();
        }
        return Promise.reject('请输入正确的价格!');
    };

    /**
     * 级联更新
     * @returns {*}
     */
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };
    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 500);
    };

    componentDidMount() {
        const options = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                isLeaf: false,
            },
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                isLeaf: false,
            },
        ];
        this.setState({
            options
        });
    }

    componentWillMount() {
        const product = this.props.location.state;
        this.isUpdate = !!product;
        this.product = product || {};
    }

    render() {
        const {options} = this.state;
        const {isUpdate, product} = this;
        const {name, desc, price} = product;
        const categorys = [];
        const imgs = []
        let richTextEditor;
        if (isUpdate) {
            categorys.push('zhejiang');
            categorys.push('dynamic1');
            imgs.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            });
            richTextEditor = '<p>sss</p>'
        }

        const title = (
            <span>
                <LinkButton>
                     <LeftCircleTwoTone onClick={() => this.props.history.goBack()}/>
                </LinkButton>
                <span style={{margin: '0 5px'}}>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 10},
        };

        return (
            <Card title={title} className='product-addUpdate'>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    initialValues={{
                        name: name,
                        desc: desc,
                        price: price,
                        category: categorys
                    }}>
                    <Item
                        label="商品名称"
                        name="name"
                        rules={[{required: true, message: '请输入商品名称!'}]}
                    >
                        <Input placeholder='请输入商品名称'/>
                    </Item>
                    <Item
                        label="商品描述"
                        name="desc"
                    >
                        <TextArea placeholder='请输入商品描述' autosize={{minRows: 1, maxRows: 6}}/>
                    </Item>
                    <Item
                        label="商品价格"
                        name="price"
                        rules={[{required: true, message: '请输入商品价格!'}, {validator: this.validatePrice}]}
                    >
                        <Input
                            type='number'
                            placeholder='请输入商品价格'
                            min={0}
                            max={10000}
                            step={10}
                            addonAfter='元'
                        />
                    </Item>
                    <Item
                        label="商品分类"
                        name="category"
                        rules={[{required: true, message: '请输入商品分类!'}]}
                    >
                        <Cascader
                            options={options}
                            changeOnSelect
                            loadData={this.loadData}
                            onChange={this.onChange}
                            placeholder='请输入商品分类'
                        />
                    </Item>
                    <Item
                        label="商品图片"
                        name="imgs"
                    >
                        <PictureWall ref={this.pwRef} imgs={imgs}/>
                    </Item>
                    <Item
                        label="商品详情"
                        labelCol={{span: 4}}
                        wrapperCol={{span: 20}}
                    >
                        <RichTextEditor ref={this.rtRef} value={richTextEditor}/>
                    </Item>

                    <Item>
                        <Button type='primary' onClick={this.handleSubmit}>提 交</Button>
                    </Item>


                </Form>
            </Card>
        )
    }
}

/**
 * 子组件调用父组件的方法：
 *  1.将父组件的方法传给子组件，子组件调用
 *
 * 父组件调用子组件的方法：
 *  1.在父组件通过ref得到子组件标签对象，调用其方法
 *
 */
