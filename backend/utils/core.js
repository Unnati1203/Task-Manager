const {Task,Audit}=require('../models');
exports.ok=(res,data,message='Success',extra={})=>res.json({success:true,message,data,...extra});
exports.log=(user,action,entity,entityId,metadata={})=>Audit.create({user,action,entity,entityId,metadata});
exports.projectProgress=async project=>{const [total,done]=await Promise.all([Task.countDocuments({project}),Task.countDocuments({project,status:'Completed'})]);return total?Math.round(done/total*100):0};
exports.overdue=q=>({...q,status:{$ne:'Completed'},dueDate:{$lt:new Date()}});
