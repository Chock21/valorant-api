import Rank from "../models/RankModel.js";

const getRanks = async (request, response) => {
    try {
        const filter = {};
        if (request.query.name) {
            filter.name = request.query.name;
        }
        const ranks = await Rank.find(filter);
        if (ranks.length === 0) {
            return response.status(404).json({ msg: "No se encontraron rangos." });
        }

        //agrego la url de img a rank
        const ranksWithUrls = ranks.map(rank => {
            const rankObj = rank.toObject();
            if (!rankObj.image.startsWith('http')) {
                rankObj.image = `${request.protocol}://${request.get('host')}/uploads/ranks/${rankObj.image}`;
            }
            return rankObj;
        });

        response.status(200).json(ranksWithUrls);
    } catch (error) {
        response.status(500).json({ msg: "Error al obtener los rangos" });
    }
}

const getRankById = async( request, response ) => {
    const id = request.params.id;
    try {
        const rank = await Rank.findById(id);
        if (rank) {
            const rankObj = rank.toObject();
            rankObj.image = `${request.protocol}://${request.get('host')}/uploads/ranks/${rankObj.image}`;
            response.status(200).json(rankObj);
        } else {
            response.status(404).json({ msg: 'No se encontró el rango' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al obtener el rango' });
    }
}

const addRank = async(request, response) => {
    const { name } = request.body;
    const image = request.file ? request.file.filename : null;

    if (!name) {
        return response.status(403).json({ msg: "Falta el nombre del rango" });
    }
    if (!image) {
        return response.status(400).json({ msg: "Falta la imagen" });
    }
    
    const newRank = new Rank({
        name,
        image,
    });
    await newRank.save();
    response.json({ msg: "Rango creado", data: { id: newRank._id, name: newRank.name, image: newRank.image } });
}

const updateRank = async (request, response) => {
    const id = request.params.id;
    let updates = { name: request.body.name };

    if (request.file) {
        updates.image = request.file.filename;
    }

    try {
        const newRank = await Rank.findByIdAndUpdate(id, updates, { new: true });
        if (newRank) {
            response.json({ msg: 'Rango actualizado', data: { newRank } });
        } else {
            response.status(404).json({ msg: 'No se encontró el rango' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al actualizar el rango' });
    }   
}

const deleteRank = async (request, response) => {
    const id = request.params.id;
    try {
        const status = await Rank.findByIdAndDelete(id);
        if (status) {
            response.json({ msg: 'Rango eliminado' });
        } else {
            response.status(404).json({ msg: 'No se encontró el rango' });
        }
    } catch (error) {
        response.status(500).json({ msg: 'Error al eliminar el rango' });
    }
}

export { getRanks, getRankById, addRank, updateRank, deleteRank };