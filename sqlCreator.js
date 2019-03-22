document.write('<script language=javascript src="./websourcepage.js"></script>');
SqlCreator = (function() {
  return SqlCreator = {
    create: function(params) {
      this.initDistrict();
      var totalSql = '';
      if (params.count > 0) {
        for(var i = 0; i< params.count; i++) {
          var fileds = [], values = [];
          for(var j = 0; j < params.fields.length; j++) {
            var field = params.fields[j];
            fileds.push(field.name);
            switch(field.type) {
              case 'time':
                var year = this.getRandom(field.start, field.end, true);
                var month = this.getRandom(1 , 12, true);
                var day = this.getRandom(1 , 31, true);
                values.push('\'' +year + '-' + month + '-' + day + '\'');
                break;
              case 'number':
                var val = this.getRandom(field.start, field.end, false);
                values.push(val);
                break;
              case 'district':
                var districtIndex = this.districts.length - 1;
                var randomIndex = this.getRandom(0, districtIndex, true);
                values.push('\'' + this.districts[randomIndex] + '\'');
                break;
            }
          }
          var sql = this.createSql(params.table, fileds, values);
          totalSql += sql;
          totalSql += '<br/>';
        }
      }
      return totalSql;
    },
    createSql(table,fields,values){
      var sql = 'insert into ' + table + ' ( ' + fields.toString() + ' ) values (' +  values.toString() + ');';
      return sql;
    },
    getRandom(from,to,isInt) {
      var val = (Math.random() * (to - from)) + from
      if (isInt) {
        return parseInt(val);
      } else {
        return parseFloat(val).toFixed(4);
      }
    },
    initDistrict() {
      var districts = DistrictPageSource.match(/[1-9]{1}[1-9]{1}0{4}/g);
      // 清洗掉重复的记录
      this.districts = this.distinct(districts);
    },
    distinct(distincts) {
      var distinctDis = [];
      $.each(distincts, function(index, item) {
        if(distinctDis.indexOf(item) == -1) {
          distinctDis.push(item);
        }
      })
      return distinctDis;
    }
    
  }
})()