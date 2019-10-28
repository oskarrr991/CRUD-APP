const express = require('express');
const app = express();
var mysql = require('mysql');
var url = require('url');
var cors = require('cors');
var bodyParser = require('body-parser');
var databaseCredentials = require('./env');
var port = require('./port')

app.use(cors({
  origin: port
}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

app.get('/Doctags', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');


    con.query("SELECT * FROM doctags ORDER BY Title", function (err, result, fields) {
      if (err) throw err;
      res.json(
        result
      );
    });

    con.end();
  });
}).listen('1337');

app.get('/TopicsCount', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query; 
    const id = Number(urlParams.id); 

    con.query("SELECT COUNT(*) AS 'Count' FROM topics WHERE DocTagId = " + id, function (err, result, fields) {
      if (err) throw err;

      res.json(
        result
      );
    });

    con.end();
  });
})

app.get('/Topics', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');


    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);
    const rowToStartFrom = Number(urlParams.skip);
    const rowsToShow = Number(urlParams.take);
    const orderBy = urlParams.orderBy;
    const direction = urlParams.direction;
    const filterBy = urlParams.filterBy;
    console.log(filterBy);
    if (!filterBy) {
        con.query("SELECT Title, CreationDate, ViewCount, Id FROM topics WHERE DocTagId = " + id +
        " ORDER BY " + orderBy + " " + direction + " " +
        " LIMIT " + rowToStartFrom + ", " + rowsToShow,
        function (err, result, fields) {
          if (err) throw err;

          res.json(result);
        });

      con.end();
    }
    else {
        con.query("SELECT Title, CreationDate, ViewCount, Id FROM topics WHERE DocTagId = " + id +
        " AND Title LIKE '%" + filterBy + "%'",
        " ORDER BY " + orderBy + " " + direction + " " +
        " LIMIT " + rowToStartFrom + ", " + rowsToShow,
        function (err, result, fields) {
          if (err) throw err;

          res.json(
            result
          );
        });

      con.end();
    }
  });
});

app.get('/Topic/:id', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    const id = Number(req.params.id);
    console.log(id);

    con.query("SELECT Title FROM topics WHERE Id = " + id + " ", function (err, result, fields) {
      if (err) throw err;

      res.json(result[0]);
    });

    con.end();
  })

})

app.get('/Examples', (req, res) => {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');


    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);

    con.query("SELECT Id, Title, BodyHtml, BodyMarkdown FROM examples WHERE DocTopicId = " + id, function (err, result, fields) {
      if (err) throw err;

      res.json(
        result
      );
    });

    con.end();
  });
});

app.get('/DoctagVersions', function (req, res) {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);
    con.query("SELECT * FROM doctagversions WHERE DocTagId = " + id, function (err, result, fields) {
      if (err) throw err;

      res.json(
        result
      );
    });

    con.end();
  });
})

app.get('/TopicHistories', function (req, res) {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query;
    const id = Number(urlParams.id);

    con.query('SELECT th.Text, tht.Name ' +
      'FROM topichistories th ' +
      'JOIN topichistorytypes tht ON th.DocTopicHistoryTypeId = tht.Id ' +
      'WHERE th.DocTopicId = ' + id,
      function (err, result, fields) {
        if (err) throw err;

        res.json(
          result
        );
      });

    con.end();
  });
})

app.get('/Contributors', function (req, res) {
  var con = mysql.createConnection(databaseCredentials);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    let urlParams = url.parse(req.url, true).query;
    const DocExampleId = Number(urlParams.DocExampleId);
    console.log(DocExampleId);


    con.query('SELECT c.Id, ct.Name AS "Type", cdr.Name AS "DeletionReason"' +
      'FROM contributors c ' +
      'LEFT JOIN contributortypes ct ON c.DocContributorTypeId = ct.Id ' +
      'LEFT JOIN contributordeletionreasons cdr ON c.DocContributorDeletionReasonId = cdr.Id ' +
      'WHERE c.DocExampleId = ' + DocExampleId,
      function (err, result, fields) {
        if (err) throw err;

        res.json({
          result
        });
      });

    con.end();
  })
})

app.post('/Doctags', (req, res) => {
  const tag = req.body.tag;
  const name = req.body.name;

  var con = mysql.createConnection(databaseCredentials);

  const creationDate = '/Date(' + new Date().getTime() + '-0400)/';

  values = [
    [tag,
      name,
      creationDate,
      0,
      0
    ]
  ]

  const query = 'INSERT INTO doctags (Tag, Title, CreationDate, HelloWorldDocTopicId, TopicCount) VALUES ?';

  con.connect((error) => {
    console.log(error);
    con.query(query, [values], (err, result) => {
      if (err) {
        res.json(false);
        throw err;
      }
      res.json(result);
    });

    con.end();
  });
});

app.post('/Topics', function (req, res) {
  const introductionHtml = req.body.introductionHtml;
  const syntaxHtml = req.body.syntaxHtml;
  const parametersHtml = req.body.parametersHtml;
  const remarksHtml = req.body.remarksHtml;
  const introductionMarkdown = req.body.introductionMarkdown;
  const syntaxMarkdown = req.body.syntaxMarkdown;
  const parametersMarkdown = req.body.parametersMarkdown;
  const remarksMarkdown = req.body.remarksMarkdown;
  const helloWorldVersionsHtml = req.body.helloWorldVersionsHtml;
  const title = req.body.title;
  const doctagId = req.body.docTagId;

  const con = mysql.createConnection(databaseCredentials);

  const creationDate = '/Date(' + new Date().getTime() + '-0400)/';

  values = [
    [doctagId,
      false,
      title,
      creationDate,
      0,
      null,
      0,
      null,
      0,
      0,
      0,
      introductionHtml,
      syntaxHtml,
      parametersHtml,
      remarksHtml,
      introductionMarkdown,
      syntaxMarkdown,
      parametersMarkdown,
      remarksMarkdown,
      helloWorldVersionsHtml
    ]
  ]

  const query = 'INSERT INTO topics (DocTagId, IsHelloWorldTopic, Title, CreationDate, ViewCount, LastEditDate, LastEditUserId, LastEditUserDisplayName, ContributorCount, ExampleCount, ExampleScore, IntroductionHtml, SyntaxHtml, ParametersHtml, RemarksHtml, IntroductionMarkdown, SyntaxMarkdown, ParametersMarkdown, RemarksMarkdown, HelloWorldVersionsHtml) VALUES ?';

  con.connect((error) => {
    console.log(error);
    con.query(query, [values], (err, result) => {
      if (err) {
        res.json(false);
        throw err;
      }
      res.json(result);
    });

    con.end();
  });
})

app.post('/Examples', (req, res) => {
  const title = req.body.title;
  const bodyHtml = req.body.bodyHtml;
  const bodyMarkdown = req.body.bodyMarkdown;
  const docTopicId = req.body.docTopicId;

  var con = mysql.createConnection(databaseCredentials);

  const creationDate = '/Date(' + new Date().getTime() + '-0400)/';

  values = [
    [docTopicId,
      title,
      creationDate,
      null,
      0,
      0,
      bodyHtml,
      bodyMarkdown,
      false
    ]
  ]

  const query = 'INSERT INTO examples (DocTopicId, Title, CreationDate, LastEditDate, Score, ContributorCount, BodyHtml, BodyMarkdown, IsPinned) VALUES ?';

  con.connect((error) => {
    console.log(error);
    con.query(query, [values], (err, result) => {
      if (err) {
        res.json(false);
        throw err;
      }
      res.json(result);
    });

    con.end();
  });
});

app.delete('/deleteTopic/:id', (req, res) => { //Pavyzdys
  const con = mysql.createConnection(databaseCredentials);
  const topicId = Number(req.params.id); //Pas mane 4 tik dasideti values, kaip insertinant dariau
  console.log(topicId);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    con.query('DELETE FROM topics WHERE Id = ' + topicId, function (err, result, fields) {
      if (err) {
        res.json(false);
        throw err;
      }
      console.log('Successfully deleted');
    });

    con.end();
  })
})

app.delete('/deleteExample/:id', (req, res) => {
  const con = mysql.createConnection(databaseCredentials);
  const exampleId = Number(req.params.id);

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');

    con.query('DELETE FROM examples WHERE Id = ' + exampleId, function (err, result, fields) {
      if (err) {
        res.json(false);
        throw err;
      }
      console.log('Successfully deleted');
    });

    con.end();
  })
})

app.put('/editExample/:id', (req, res) => {
  const con = mysql.createConnection(databaseCredentials);
  const exampleId = Number(req.params.id);
  const title = req.body.title;
  const bodyHtml = req.body.bodyHtml;
  const bodyMarkdown = req.body.bodyMarkdown;
  
  const query = 'UPDATE examples SET Title=?, BodyHtml=?, BodyMarkdown=? WHERE Id = ' + exampleId;

  con.connect((error) => {
    console.log(error);
    con.query(query, [title, bodyHtml, bodyMarkdown], (err, result) => {
      if (err) {
        res.json(false);
        throw err;
      }
      res.json(result);
      console.log('Successfully edited');
    });

    con.end();
  })
})