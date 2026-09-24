const fs=require('fs'),assert=require('assert');
const specs=[
 ['TW-G01','Google Ads','TW-GOOGLE-01','Trail shoes search',6000,1,30,'active',d=>300,'Full-month even pacing'],
 ['TW-M01','Meta Ads','TW-META-01','Camping prospecting',9000,1,30,'active',d=>150,'Full-month even pacing'],
 ['TW-G02','Google Ads','TW-GOOGLE-01','Brand search',3000,1,30,'active',d=>100,'Full-month even pacing'],
 ['TW-M02','Meta Ads','TW-META-01','Retargeting',6000,1,30,'active',d=>d<=16?100:400,'Daily spend increased on September 17'],
 ['TW-T01','TikTok Ads','TW-TIKTOK-01','Hiking video',6000,1,30,'active',d=>d<=16?250:50,'Daily spend decreased on September 17'],
 ['TW-T02','TikTok Ads','TW-TIKTOK-01','New collection launch',3000,16,30,'active',d=>d<16?0:200,'Approved launch September 16; budget covers September 16-30'],
 ['TW-G03','Google Ads','TW-GOOGLE-01','End-of-season sale',3000,1,20,'completed',d=>d<=20?150:0,'Approved end September 20; entire September budget spent'],
 ['TW-M03','Meta Ads','TW-META-01','Store visits',3000,1,30,'paused',d=>d<=16?100:0,'Paused September 17; no restart approved; budget not withdrawn']
];
const daily=[],budgets=[],expected=[];const date=d=>'2026-09-'+String(d).padStart(2,'0');
for(const [id,channel,account,name,budget,start,end,status,spend,note] of specs){
 const common={brand:'Tawi Outdoor',channel,account_id:account,campaign_id:id,campaign_name:name,currency:'USD',reporting_timezone:'Africa/Nairobi',synthetic:true};
 budgets.push({...common,budget_month:'2026-09',monthly_budget:budget,planned_start:date(start),planned_end:date(end),status_as_of_cutoff:status,status_effective_date:status==='paused'?date(17):status==='completed'?date(21):date(start),budget_basis:'Even pacing over approved flight dates',plan_note:note,as_of_date:date(23),source_row_id:'budget-'+id});
 for(let d=1;d<=23;d++)daily.push({...common,date:date(d),spend:spend(d),data_status:'complete',source_row_id:id+'-'+date(d)});
 const total=Array.from({length:23},(_,i)=>spend(i+1)).reduce((a,b)=>a+b,0),elapsed=Math.max(0,Math.min(23,end)-start+1),flight=end-start+1,remaining=Math.max(0,end-23),recent=Array.from({length:7},(_,i)=>spend(i+17)).reduce((a,b)=>a+b,0)/7,target=budget*elapsed/flight;
 expected.push({campaign_id:id,campaign_name:name,status,monthly_budget:budget,spend_to_cutoff:total,planned_spend_to_cutoff:target,pace_percent:100*total/target,remaining_budget:budget-total,approved_flight_days:flight,elapsed_flight_days:elapsed,remaining_flight_days:remaining,flight_adjusted_projection:total/elapsed*flight,last_7_day_average:recent,recent_run_rate_projection:status==='paused'||status==='completed'?total:total+recent*remaining,remaining_daily_allowance:remaining?Math.max(0,budget-total)/remaining:null,already_over_budget:Math.max(0,total-budget)});
}
function write(name,rows){fs.writeFileSync('data/'+name+'.json',JSON.stringify(rows,null,2)+'\n');const keys=Object.keys(rows[0]);const esc=v=>/[",\r\n]/.test(String(v))?'"'+String(v).replaceAll('"','""')+'"':String(v);fs.writeFileSync('data/'+name+'.csv',[keys.join(','),...rows.map(r=>keys.map(k=>esc(r[k])).join(','))].join('\n')+'\n');}
write('campaign-daily',daily);write('campaign-budgets',budgets);
assert.equal(daily.length,184);assert.equal(budgets.length,8);assert.equal(new Set(daily.map(x=>x.source_row_id)).size,184);
const result={as_of:'2026-09-24',complete_data_through:'2026-09-23',currency:'USD',timezone:'Africa/Nairobi',threshold:'Flag projections more than 10% over or under budget; completed campaigns at budget are not underspending.',total_budget:specs.reduce((n,s)=>n+s[4],0),total_spend:expected.reduce((n,x)=>n+x.spend_to_cutoff,0),campaigns:expected};
fs.writeFileSync('evidence/expected-calculations.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({rows:daily.length,budgets:budgets.length,budget:result.total_budget,spend:result.total_spend}));

