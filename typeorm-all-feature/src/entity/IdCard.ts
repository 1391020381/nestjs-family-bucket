import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
@Entity({
    name:"id_card"
})
export class IdCard {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        length:50,
        comment:'身份证'
    })
    cardName:string
    @JoinColumn()
    @OneToOne(()=> User,{
        onDelete:'CASCADE'
    })
    user:User
}