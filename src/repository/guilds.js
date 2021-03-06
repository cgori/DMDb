import RepositoryStructure from '../structures/repository';

/**
 * Guilds repository.
 * 
 * @prop {Object} model - Guilds model
 */
class GuildsRepository extends RepositoryStructure {
    /**
     * Create guilds repository.
     * 
     * @param {Object} client - DMDb client extends Eris
     */
    constructor(client) {
        super(client);

        this.model = this.db.model('guilds', new this.db.Schema({
            id: { type: String, required: true },
            prefix: { type: String, default: '' },
            commandDisabledMessage: { type: Boolean, default: true },
            disabledCommands: { type: [ String ], default: [] },
            apiLanguage: { type: String, default: 'en' },
            apiRegion: { type: String, default: 'us' },
        }));
    }

    /**
     * Get guild from database.
     * 
     * @param {string} ID - Guild ID
     * @returns {Promise} - Guild settings
     */
    get(ID) {
        return this.model.findOne({ id: ID });
    }

    /**
     * Insert guild into database.
     * 
     * @param {string} ID - Guild ID
     * @param {Object} data - Guild settings
     * @returns {Promise} - Guild settings
     */
    insert(ID, data) {
        return this.model.create({ id: ID, ...data });
    }

    /**
     * Update guild in database.
     * 
     * @param {string} ID - Guild ID
     * @param {Object} data - Guild settings
     * @returns {Promise} - Guild settings
     */
    update(ID, data) {
        return this.model.findOneAndUpdate({ id: ID }, { ...data });
    }

    /**
     * Delete guild in database.
     * 
     * @param {string} ID - Guild ID
     * @returns {Promise}
     */
    delete(ID) {
        return this.model.deleteOne({ id: ID });
    }

    /**
     * Get guild, update or insert (if it doesn't exist) guild.
     * 
     * @param {string} ID - Guild ID
     * @param {Object} data - Guild settings
     * @param {boolean} insert - Do not insert guild if it doesn't exist?
     */
    getOrUpdate(ID, data, insert) {
        return this.model.findOneAndUpdate({ id: ID }, data || {}, !insert ? {
            new: true, upsert: true, setDefaultsOnInsert: true,
        } : {});
    }
}

export default GuildsRepository;
