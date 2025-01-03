import { Label, TextInput, Button } from 'flowbite-react';
import { useState } from 'react';
import apiManager from '../apiManager/ApiManager';

interface Field {
    field: string;
}

interface FieldLabel {
    value: string
}


const AssetCreator: React.FC = () => {
    const [fields, setFields] = useState<Field[]>([{field: ''}]);
    const [labels, setLabels] = useState<FieldLabel[]>([{value: ''}])
    const [category, setCategory] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    
    const handleSubmit = (category: any, fields: any) => {
      fields.unshift({'category': category});
      console.log(fields);
    }

    const deleteField = (key: number) => {
        const updatedFields = fields.filter(item => item !== fields[key])
        setFields(updatedFields)
        console.log(fields[key].field)
    }
    
    const handleClick = () => {
        handleAddField();
        handleAddLabel();
    }

    const handleAddCategory = (value: string) => {
        setCategory(value)
    }

    const handleAddField = () => {
        setFields([...fields, { field: '' }]);
        setLabels([...labels]);
    };

    const handleAddLabel = () => {
        setLabels([...labels])
    }

    const handleChange = (index: number, field: string) => {
        const newFields = [...fields];
        newFields[index].field = field;
        setFields(newFields);
    };

    return (
        <form className='mx-4 my-4'>
          <h1 className='text-xl text-center mb-4'>New Asset Type Creation</h1>
          <div className=''>
            <Label>
              Start by creating a category
            </Label>
            <div className='flex gap-2 mt-2 items-center border-b mb-6'>
              <Label className='text-lg w-1/2 mb-4'>
                Category Name
              </Label>
              <TextInput 
                className='mb-4'
                value={category}
                onChange={(e) => handleAddCategory(e.target.value)} />
              </div>
              <Label>
                Next add some fields
              </Label>
            {Object.keys(fields).map((field, index) => (
              <div className='flex gap-2 mt-2 items-center'>
                <Label
                key={index}
                className='text-lg'
                >
                  Field Name
                </Label>
                <TextInput
                className=''
                key={index}
                type='text'
                value={fields[index].field}
                onChange={(e) => handleChange(index, e.target.value)}
                />
                <Button className='flex justify-center items-center bg-transparent enabled:hover:bg-transparent enabled:hover:border-none enabled:border-none' type='button' onClick={() => deleteField(index)}>
                <svg className="trash w-6 h-6 text-gray-800 dark:text-white hover:text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                </svg>
                </Button>
              </div>
                ))}
            <button
              className='flex mt-2 bg-transparent border-none hover:font-bold'
              type='button' 
              onClick={handleClick}>
              <svg className="w-6 h-6 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
              </svg>Add Field</button>
            </div>
            <Button
              className='flex w-full mt-6 ' 
              type='button'
              onClick={() => handleSubmit(category, fields)} 
            >
              Create Asset
            </Button>
        </form>
    )
}

export default AssetCreator;