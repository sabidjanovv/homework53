const { 
    errorHandler
} = require("../helpers/error_handler");
const Worker = require("../schemas/Worker")

const addWorker = async(req, res)=>{
    try{
        const {FISH, age, department} = (req.body);
        const newDep = await Worker.create({
          FISH,
          age,
          department,
        });

        res.status(201).send({
            message:"Yangi ishchi qoshildi", 
            newDep});
    }catch(error){
        errorHandler(res,error)
    }
};

const getWorkers = async(req, res)=>{
    try{
        const deps = await Worker.find()
          .select("FISH")
          //   .populate("department", "name -_id");
          .populate({
            path:"department",
            match: { name: "Dasturlash" },
            select:"name -_id"
        });

        res.send(deps);
    }catch(error){
        errorHandler(res,error)
    }
};

const getWorkerById = async(req, res)=>{
    try{
        const worker = await Worker.findById(req.params.id);
        if(!worker) return res.status(404).send({message: "Ishchi topilmadi"});
        res.send(worker);
    }catch(error){
        errorHandler(res,error)
    }
};


const updateWorker = async(req, res)=>{
    try{
        const { id } = req.params;
        const {FISH, age, department} = req.body;
        const updated_worker = await Worker.findByIdAndUpdate(
            id,
            { FISH, age, department },
            { new: true, runValidators: true }
        );
        if(!updated_worker){
            return res.status(404).send({
                statusCode: 404,
                message: "Worker not found"
            });
        }
        return res.status(200).send({
            statusCode:200,
            message: "Worker updated successfully", 
            data:updated_worker
        });
    }catch(error){
        errorHandler(res,error)
    }
};


const deleteWorker = async(req, res)=>{
    try{
        const { id } = req.params;
        const deleted_worker = await Worker.findByIdAndDelete(id);
        if(!deleted_worker){
            return res.status(404).send({
                statusCode: 404,
                message: "Worker not found"
            });
        }
        return res.status(200).send({
            statusCode:200,
            message: "Worker deleted successfully", 
            data: deleted_worker
        });
    }catch(error){
        errorHandler(res,error)
    }
};




module.exports = {
    addWorker,
    getWorkers,
    getWorkerById,
    updateWorker,
    deleteWorker
}