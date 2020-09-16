import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useFormik } from 'formik';
import './BriefForm.scss';

import { Props } from './BriefFormContainer'

interface Fields {
    title?: string,
    comment?: string,
    productId?: number|string
}

const validate = (values:Fields):Fields => {
    const errors: Fields = {}

    if(!values.title){
        errors.title = "Required"
    } else if(values.title.length < 3 || values.title.length > 15){
        errors.title = "Length should be between 3 and 15 characters"
    }

    if(!values.comment){
        errors.comment = "Required"
    } else if(values.comment.length < 10){
        errors.comment = "Length should be 10 characters minimum"
    }

    if(!values.productId){
        errors.productId = "Required"
    }

    return errors
}

export const BriefForm = (props:Props) => {
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [productId, setProductId] = useState("");
    
    const formik = useFormik({
        initialValues:{
            title: '',
            comment: '',
            productId: ''
        },
        validate,
        onSubmit: (values, { setSubmitting, setValues }) => {
            console.log("submit", values);
            Axios.post('http://localhost:3001/briefs',values)
            .then((res)=>{
                console.log(res);
                props.addBrief(res.data);
                props.addBriefSuccess();
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setValues({
                    title: '',
                    comment: '',
                    productId: ''
                });
                setSubmitting(false);
            })            
          },
    })


    useEffect(()=>{
        Axios.get('http://localhost:3001/products')
            .then((res)=>{
                console.log("SUCCESS",res)
                props.hydrateProducts(res.data)
            })
            .catch((err)=>{
                console.log("ERROR", err)
            })
    }, []);

    return (
      <div id="brief_form_root">
        <form id="brief_form" onSubmit={(e)=>{console.log("lol");formik.handleSubmit(e)}}>
            <TextField
                id="title-input"
                label="Title"
                type="text"
                variant="outlined"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                helperText={formik.touched.title && formik.errors.title}
                error={formik.touched.title && !!formik.errors.title}
            />
            
            <TextField
                id="comment-input"
                label="Comment"
                type="text"
                multiline
                variant="outlined"
                rows={5}
                name="comment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
                helperText={formik.touched.comment && formik.errors.comment}
                error={formik.touched.comment && !!formik.errors.comment}
            />

            <FormControl variant="outlined">
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                    labelId="product-select-label"
                    id="product-select"
                    label="Product"
                    name="productId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.productId}
                    error={formik.touched.productId && !!formik.errors.productId}
                >
                    <MenuItem value=""><em>Select a product</em></MenuItem>
                    {props.products.map(product => 
                        <MenuItem value={product.id}>{product.name}</MenuItem>
                    )}                    
                </Select>
                <FormHelperText className="Mui-error">{formik.touched.productId && formik.errors.productId}</FormHelperText>
            </FormControl>
            <Button disabled={ formik.isSubmitting || !formik.isValid } className="send_brief_btn" variant="outlined" color="primary" size="large" disableElevation startIcon={<SaveIcon />} type="submit">SAVE</Button>
            
        </form>
      </div>
    );
}
