import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';
import { ReservationStatus } from '../../../domain/entities/Reservation';

export class ReservationModel extends Model {
    public id!: number;
    public reservationNumber!: string;
    public name!: string;
    public phoneNumber!: string;
    public email!: string;
    public checkIn!: Date;
    public checkOut!: Date;
    public roomType!: string;
    public resortCode!: string;
    public adults!: number;
    public children!: number;
    public totalPrice!: number;
    public pricePerDay!: number;
    public reservationStatus!: ReservationStatus;
}

ReservationModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        reservationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        checkIn: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkOut: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        roomType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resortCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adults: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        children: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        pricePerDay: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        reservationStatus: {
            type: DataTypes.ENUM(...Object.values(ReservationStatus)),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'reservations',
    }
);