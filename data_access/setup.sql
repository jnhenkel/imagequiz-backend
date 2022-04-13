create schema if not exists imagequiz;

drop table if exists imagequiz.score CASCADE;
drop table if exists imagequiz.customer CASCADE;
drop table if exists imagequiz.quiz_question CASCADE; 
drop table if exists imagequiz.question CASCADE;
drop table if exists imagequiz.quiz CASCADE; 
drop table if exists imagequiz.category CASCADE; 
drop table if exists imagequiz.flower CASCADE; 

create table imagequiz.customer (
	id bigserial primary key,
	name varchar(255) not null,
	email varchar(255) not null unique,
	password varchar(255) not null
);

create table imagequiz.question (
	id bigserial primary key,
	picture varchar(255) not null,
	choices varchar(255) not null,
	answer varchar(255) not null
);

create table imagequiz.category (
	id bigserial primary key,
	name varchar(255) not null
);

create table imagequiz.quiz (
	id bigserial primary key,
	name varchar(255) not null,
	category_id int references imagequiz.category(id)
);

create table imagequiz.quiz_question (
	quiz_id int references imagequiz.quiz(id),
	question_id int references imagequiz.question(id)
)

create table imagequiz.flower (
	id bigserial primary key,
	name varchar(255) not null,
	picture varchar(255) not null
);

create table imagequiz.score (
	id bigserial primary key,
	customer_id int references imagequiz.customer(id),
	quiz_id int references imagequiz.quiz(id),
	date timestamp not null,
	score float8 not null
);

insert into imagequiz.category (name) values ('Acacia'),('Alyssum'),('Amaryllis'),('Aster'),('Azalea'),('Begonia'),('Buttercup'),('Calluna'),('Camellia'),('Cardinal'),('Carnation'),('Clover'),('Crown Imperial'),('Daffodil'),('Dahlia'),('Daisy'),('Gladiolus'),('Lantana'),('Lily'),('Lotus'),('Marigold'),('Orchid'),('Primrose'),('Sunflower'),('Tickseed'),('Tulip'),('Zinnia');

insert into imagequiz.flower (name, picture) values ('Acacia','https://habahram.blob.core.windows.net/flowers/acacia.jpg'),('Alyssum','https://habahram.blob.core.windows.net/flowers/alyssum.jpg'),('Amaryllis','https://habahram.blob.core.windows.net/flowers/amaryllis.jpg'),('Aster','https://habahram.blob.core.windows.net/flowers/aster.jpg'),('Azalea','https://habahram.blob.core.windows.net/flowers/azalea.jpg'),('Begonia','https://habahram.blob.core.windows.net/flowers/begonia.jpg'),('Buttercup','https://habahram.blob.core.windows.net/flowers/buttercup.jpg'),('Calluna','https://habahram.blob.core.windows.net/flowers/calluna.jpg'),('Camellia','https://habahram.blob.core.windows.net/flowers/camellia.jpg'),('Cardinal','https://habahram.blob.core.windows.net/flowers/cardinal.jpg'),('Carnation','https://habahram.blob.core.windows.net/flowers/carnation.jpg'),('Clover','https://habahram.blob.core.windows.net/flowers/clover.jpg'),('Crown Imperial','https://habahram.blob.core.windows.net/flowers/crownimperial.jpg'),('Daffodil','https://habahram.blob.core.windows.net/flowers/daffodil.jpg'),('Dahlia','https://habahram.blob.core.windows.net/flowers/dahlia.jpg'),('Daisy','https://habahram.blob.core.windows.net/flowers/daisy.jpg'),('Gladiolus','https://habahram.blob.core.windows.net/flowers/gladiolus.jpg'),('Lantana','https://habahram.blob.core.windows.net/flowers/lantana.jpg'),('Lily','https://habahram.blob.core.windows.net/flowers/lily.jpg'),('Lotus','https://habahram.blob.core.windows.net/flowers/lotus.jpg'),('Marigold','https://habahram.blob.core.windows.net/flowers/Marigold.jpg'),('Orchid','https://habahram.blob.core.windows.net/flowers/orchid.jpg'),('Primrose','https://habahram.blob.core.windows.net/flowers/primrose.jpg'),('Sunflower','https://habahram.blob.core.windows.net/flowers/sunflower.jpg'),('Tickseed','https://habahram.blob.core.windows.net/flowers/tickseed.jpg'),('Tulip','https://habahram.blob.core.windows.net/flowers/tulip.jpg'),('Zinnia','https://habahram.blob.core.windows.net/flowers/zinnia.jpg');

insert into imagequiz.quiz (name, category_id) values ('Acacia',1),('Alyssum',2),('Amaryllis',3),('Aster',4),('Azalea',5),('Begonia',6),('Buttercup',7),('Calluna',8),('Camellia',9),('Cardinal',10),('Carnation',11),('Clover',12),('Crown Imperial',13),('Daffodil',14),('Dahlia',15),('Daisy',16),('Gladiolus',17),('Lantana',18),('Lily',19),('Lotus',20),('Marigold',21),('Orchid',22),('Primrose',23),('Sunflower',24),('Tickseed',25),('Tulip',26),('Zinnia',27);

insert into imagequiz.quiz_question (quiz_id, question_id) values (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(2,7),(2,8),(2,9),(2,10),(2,11),(2,12),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(4,19),(4,20),(4,21),(4,22),(4,23),(4,24),(5,25),(5,26),(5,27),(5,28),(5,29),(5,30),(6,31),(6,32),(6,33),(6,34),(6,35),(6,36),(7,37),(7,38),(7,39),(7,40),(7,41),(7,42),(8,43),(8,44),(8,45),(8,46),(8,47),(8,48),(9,49),(9,50),(9,51),(9,52),(9,53),(9,54),(10,55),(10,56),(10,57),(10,58),(10,59),(10,60),(11,61),(11,62),(11,63),(11,64),(11,65),(11,66),(12,67),(12,68),(12,69),(12,70),(12,71),(12,72),(13,73),(13,74),(13,75),(13,76),(13,77),(13,78),(14,79),(14,80),(14,81),(14,82),(14,83),(14,84),(15,85),(15,86),(15,87),(15,88),(15,89),(15,90),(16,91),(16,92),(16,93),(16,94),(16,95),(16,96),(17,97),(17,98),(17,99),(17,100),(17,101),(17,102),(18,103),(18,104),(18,105),(18,106),(18,107),(18,108),(19,109),(19,110),(19,111),(19,112),(19,113),(19,114),(20,115),(20,116),(20,117),(20,118),(20,119),(20,120),(21,121),(21,122),(21,123),(21,124),(21,125),(21,126),(22,127),(22,128),(22,129),(22,130),(22,131),(22,132),(23,133),(23,134),(23,135),(23,136),(23,137),(23,138),(24,139),(24,140),(24,141),(24,142),(24,143),(24,144),(25,145),(25,146),(25,147),(25,148),(25,149),(25,150),(26,151),(26,152),(26,153),(26,154),(26,155),(26,156),(27,157),(27,158),(27,159),(27,160),(27,161),(27,162);

/*
*I used this function to insert each row into questions
*to do this I put this method into /data_access/store.js,
* then I called store.insertQuestion() from index.js get '/' root path
* and used postman to get '/' root path and it inserted for me
    insertQuestion: () => {
        let result = [];
        for (id in quizzes) {
            for (el of quizzes[id].questions) {
                result.push([el.picture, el.choices.join(','), el.answer])

            }
        }
        return pool.query(format('insert into imagequiz.question (picture, choices, answer) values %L',result), [], (err, result2) =>{
            console.log(err);
            console.log(result2);
        })
        //return pool.query('insert into imagequiz.question (picture, choices, answer) values ($1,$2,$3),($4,$5,$6),($7,$8,$9),($10,$11,$12),($13,$14,$15),($16,$17,$18),($19,$20,$21),($22,$23,$24),($25,$26,$27),($28,$29,$30),($31,$32,$33),($34,$35,$36),($37,$38,$39),($40,$41,$42),($43,$44,$45),($46,$47,$48),($49,$50,$51),($52,$53,$54),($55,$56,$57),($58,$59,$60),($61,$62,$63),($64,$65,$66),($67,$68,$69),($70,$71,$72),($73,$74,$75),($76,$77,$78),($79,$80,$81),($82,$83,$84),($85,$86,$87),($88,$89,$90),($91,$92,$93),($94,$95,$96),($97,$98,$99),($100,$101,$102),($103,$104,$105),($106,$107,$108),($109,$110,$111),($112,$113,$114),($115,$116,$117),($118,$119,$120),($121,$122,$123),($124,$125,$126),($127,$128,$129),($130,$131,$132),($133,$134,$135),($136,$137,$138),($139,$140,$141),($142,$143,$144),($145,$146,$147),($148,$149,$150),($151,$152,$153),($154,$155,$156),($157,$158,$159),($160,$161,$162)', result)
        //note my attempt was rough but using format from pg package works better
        //var format = require('pg-format'); //this is required to use pg format()
    }
*/
