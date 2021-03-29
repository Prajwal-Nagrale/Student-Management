const {Student}=require('../Models');  //directory of your models folder
const config=require('../server');


const create = async (req, res) => {
    console.log('create student');
  
    const { rollNo, name, className, subjects} = req.body; //Naming asper your postman 
  
    let status;
    let message;
  
    try {
      const stu = new Student({ rollNo , name, className,subjects}); //Input as you students models
      await stu.save();
      status = 200;
      message = 'Student data created successfully';
    } catch (err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request';
    }
  
    res.status(status).send({ message });
  }
  
  const getAll = async (req, res) => {
    let status;
    let message;
  
    const { filterByName } = req.query;
    
    console.log("Displayed data");
    try {
      const query = {};
      if (filterByName) {
        query['name'] = filterByName;
      }
      message = await Student.find(query);
      status = 200;
    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request'
    }
    res.status(status).send({ message: message.map((stu) => ({
      rollno: stu.rollNo,
      name: stu.name,
      class:stu.className,
      subjects: stu.subjects
    })) });
  }
  
  
  
  const getById = async (req, res) => {
    console.log("Get Student by roll number");
    const { rollno } = req.params;
  
    let status;
    let message;
  
    try {
      const stu = await Student.find({ rollNo:rollno });
      status = 200;
      message = stu;
  
    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }
  
  const deleteById= async (req, res) => {
    console.log("Get Student by roll number an delete it");
    const { rollno } = req.params;
  
    let status;
    let message;
  
    try {
      const stu = await Student.deleteOne({ rollNo:rollno });
      status = 200;
      message = "Deleted Student of roll Number "+rollno;
  
    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }

  const updateById=async(req,res)=>{
    const { rollno } = req.params;
    console.log("updating "+req.params)
    let status;
    let message;
    const name=req.body.name;
    const className=req.body.className;
    const subjects=req.body.subjects;
    try {
      const stu = await Student.findOne({rollNo:rollno});
      if(name)
      stu.name=name;
      if(className)
      stu.className=className;
      if(subjects)
      stu.subjects=subjects;
      await stu.save();
      status = 200;
      message = "Updated Student data of roll Number "+rollno;

    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }
  
  module.exports = {
    create,
    getAll,
    getById,
    deleteById,
    updateById,
  }