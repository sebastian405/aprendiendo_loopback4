import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Rol, RolRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly tiene_muchos: HasManyRepositoryFactory<Usuarios, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Rol, dataSource);
    this.tiene_muchos = this.createHasManyRepositoryFactoryFor('tiene_muchos', usuariosRepositoryGetter,);
    this.registerInclusionResolver('tiene_muchos', this.tiene_muchos.inclusionResolver);
  }
}
