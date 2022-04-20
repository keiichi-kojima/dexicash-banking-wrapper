import { BaseRepository } from './BaseRepository';
import { Account, IDexiCash_Account } from '../domain/DexiCash/Account';
import { IReadObject } from './interfaces/IRead';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class AccountRepository extends BaseRepository<IDexiCash_Account, Account> implements IReadObject<Account> {
    async findOne(filter: Partial<IDexiCash_Account>): Promise<Account | null> {
        const findOneRes = await this._findOne(filter);

        if (!findOneRes) {
            return null;
        }

        let id = JSON.parse(JSON.stringify(findOneRes))._id.value;
        return Account.Create(findOneRes.props,  new UniqueEntityID(id));
    }

    async find(filter: Partial<Account>): Promise<Account[]> {
        const findAllRes = await this._find(filter);

        return findAllRes.map(doc => Account.Create(doc.props, doc.id));
    }
}