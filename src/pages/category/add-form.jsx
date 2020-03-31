import React, {Component} from 'react';
import {Form, Select, Input} from 'antd';
import PropTyprs from 'prop-types';

const Item = Form.Item;
const Option = Select.Option;

/**
 * 应用组件
 */
export default class AddForm extends Component {

    formRef = React.createRef();

    static propTypes = {
        categorys: PropTyprs.array.isRequired,
        parentId: PropTyprs.string.isRequired,
        setForm: PropTyprs.func.isRequired
    }

    onInputChange = (event) => {
        console.info(event.target.value);
        console.info(this.formRef.current);
        this.formRef.current.setFieldsValue({
            categoryName: event.target.value
        });
    }

    onSelectChange = (value ) => {
        console.info(value);
        this.formRef.current.setFieldsValue({
            parentId: value
        });
    }

    componentWillMount() {
        this.props.setForm(this.formRef);
    }

    render() {
        const {categorys, parentId} = this.props;

        return (
            <Form ref={this.formRef} initialValues={{parentId, categoryName: ''}}>
                <Item name='parentId' label='分类' rules={[{required: true, message: 'Please Select Category Type!'}]}>
                    <Select onChange={this.onSelectChange}>
                        <Option value='0'>一级分类</Option>
                        {
                            categorys.map((c) => {
                                return <Option value={c.id} key={c.id}>{c.name}</Option>
                            })
                        }
                    </Select>
                </Item>
                <Item name='categoryName' label='名称'
                      rules={[{required: true, message: 'Please Select Category Name!'}]}>
                    <Input placeholder='请输入分类名称' onChange={this.onInputChange}></Input>
                </Item>
            </Form>
        )
    }
}


