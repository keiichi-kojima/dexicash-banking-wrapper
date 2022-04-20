import { BaseRepository } from './BaseRepository';
import { Deposit, IDexiCash_Deposit } from '../domain/DexiCash/Deposit';
import { IReadObject } from './interfaces/IRead';

export class DepositRepository extends BaseRepository<IDexiCash_Deposit, Deposit> implements IReadObject<Deposit> {
    async findOne(filter: Partial<IDexiCash_Deposit>): Promise<Deposit | null> {
        const findOneRes = await this._findOne(filter);

        if (!findOneRes) {
            return null;
        }

        let id = JSON.parse(JSON.stringify(findOneRes))._id;
        return Deposit.Create(findOneRes.props, id);
    }

    async find(filter: Partial<Deposit>): Promise<Deposit[]> {
        const findAllRes = await this._find(filter);

        return findAllRes.map(doc => Deposit.Create(doc.props, doc.id));
    }
}
