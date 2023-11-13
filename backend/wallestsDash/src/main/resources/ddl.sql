    create table cash_flow_model (
       id int8 generated by default as identity,
        amount float8 not null,
        created_at timestamp,
        date date not null,
        description varchar(255),
        frequency varchar(255) not null,
        type_cash varchar(255) not null,
        user_id int8 not null,
        primary key (id)
    );

    create table user_model (
       id int8 generated by default as identity,
        email varchar(255),
        name varchar(255),
        password varchar(255),
        primary key (id)
    );

    alter table if exists cash_flow_model 
       add constraint FKcy3p8xldwhol7m9qlcw378qw7 
       foreign key (user_id) 
       references user_model;
