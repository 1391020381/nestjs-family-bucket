import { Injectable } from "@nestjs/common";
import { isNil, isFunction, omit } from "lodash";
import { EntityNotFoundError, SelectQueryBuilder, IsNull, Not } from "typeorm";
import { PostRepository } from "../repositories";
import { PostEntity } from "../entities/post.entity";
import { PaginateOptions, QueryHook } from "@/modules/database/types";
import { paginate } from "@/modules/database/helpers";
import { PostOrderType } from "../constants";
import { CreatePostDto, UpdatePostDto } from "../dtos/post.dto";
@Injectable()
export class PostService {
  constructor(protected repository: PostRepository) {}

  /**
   * 获取分页数据
   * @param options 分页选项
   * @param callback 添加额外的查询
   */
  async paginate(options: PaginateOptions, callback?: QueryHook<PostEntity>) {
    const qb = await this.buildListQuery(
      this.repository.buildBaseQB(),
      options,
      callback
    );
    return paginate(qb, options);
  }

  /**
   * 查询单篇文章
   * @param id
   * @param callback 添加额外的查询
   */
  async detail(id: string, callback?: QueryHook<PostEntity>) {
    let qb = this.repository.buildBaseQB();
    qb.where(`post.id = :id`, { id });
    qb = !isNil(callback) && isFunction(callback) ? await callback(qb) : qb;
    const item = await qb.getOne();
    if (!item)
      throw new EntityNotFoundError(PostEntity, `The post ${id} not exists!`);
    return item;
  }

  /**
   * 创建文章
   * @param data
   */
  async create(data: CreatePostDto) {
    const item = await this.repository.save(data);

    return this.detail(item.id);
  }

  /**
   * 更新文章
   * @param data
   */
  async update(data: UpdatePostDto) {
    await this.repository.update(data.id, omit(data, ["id"]));
    return this.detail(data.id);
  }

  /**
   * 删除文章
   * @param id
   */
  async delete(id: string) {
    const item = await this.repository.findOneByOrFail({ id });
    return this.repository.remove(item);
  }

  /**
   * 构建文章列表查询器
   * @param qb 初始查询构造器
   * @param options 排查分页选项后的查询选项
   * @param callback 添加额外的查询
   */
  protected async buildListQuery(
    qb: SelectQueryBuilder<PostEntity>,
    options: Record<string, any>,
    callback?: QueryHook<PostEntity>
  ) {
    const { orderBy, isPublished } = options;
    let newQb = qb;
    if (typeof isPublished === "boolean") {
      newQb = isPublished
        ? newQb.where({
            publishedAt: Not(IsNull()),
          })
        : newQb.where({
            publishedAt: IsNull(),
          });
    }
    newQb = this.queryOrderBy(newQb, orderBy);
    if (callback) return callback(newQb);
    return newQb;
  }

  /**
   *  对文章进行排序的Query构建
   * @param qb
   * @param orderBy 排序方式
   */
  protected queryOrderBy(
    qb: SelectQueryBuilder<PostEntity>,
    orderBy?: PostOrderType
  ) {
    switch (orderBy) {
      case PostOrderType.CREATED:
        return qb.orderBy("post.createdAt", "DESC");
      case PostOrderType.UPDATED:
        return qb.orderBy("post.updatedAt", "DESC");
      case PostOrderType.PUBLISHED:
        return qb.orderBy("post.publishedAt", "DESC");
      case PostOrderType.CUSTOM:
        return qb.orderBy("customOrder", "DESC");
      default:
        return qb
          .orderBy("post.createdAt", "DESC")
          .addOrderBy("post.updatedAt", "DESC")
          .addOrderBy("post.publishedAt", "DESC");
    }
  }
}
