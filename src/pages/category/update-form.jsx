import React, {Component} from 'react';
import {Form, Input} from 'antd';
import PropTyprs from 'prop-types';

const Item = Form.Item;
/**
 * 应用组件
 */
export default class UpdateForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        categoryName: PropTyprs.string,
        setForm:PropTyprs.func.isRequired
    }

    onChange = (event) => {
        console.info(event.target.value);
        this.formRef.current.setFieldsValue({
            categoryName: event.target.value,
        });

    };

    componentWillMount(){
        this.props.setForm(this.formRef);
    }

    render() {
        const {categoryName} = this.props;
        console.info(categoryName);
        return (
            <Form ref={this.formRef} initialValues={{categoryName}}>
                <Item name='categoryName' rules={[{required: true, message: 'Please Select Category Name!'}]}>
                    <Input placeholder='请输入分类名称' onChange={this.onChange}></Input>
                </Item>
            </Form>
        )
    }
}

