package org.common.test.quartz;
import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

import org.quartz.CronTrigger;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;


/**
 * 创建人: lb  日期: 2017年3月15日   描述:
 */
public class SchedulerUtils {


	private static Scheduler sched = null;
	
	/**
	 * 启动Schedule
	 * @throws SchedulerException
	 */
	public static void useJob() throws SchedulerException{		
		SchedulerFactory sf = new StdSchedulerFactory();
		 try {
			sched = sf.getScheduler();
			sched.start();
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 任务中添加作业
	 * @param jobName 任务名称，可以自己命名
	 * @param spaceTime corn表达式，调用的时间，例如“5 * * ？ * *”
	 * @param clazz job实现类
	 * @param groupName 
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void addJob(String jobName,String groupName,String spaceTime,Class clazz){

		JobDetail jobs = newJob(clazz).withIdentity(jobName,groupName).build();
		CronTrigger trigger; 
		try {
			if(sched.isShutdown()){
				sched.start();
			}
			trigger = newTrigger().withIdentity(jobName, groupName).withSchedule(cronSchedule(spaceTime)).build();
			sched.scheduleJob(jobs, trigger);
		} catch (Exception e) {
			e.printStackTrace();
			new Exception(e);
		} 
	
	}
	

	/**
	 * @param jobName
	 * @param groupName
	 * @param seconds 每隔一定的时间 重复一次
	 * @param clazz
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void addSimpleJob(String jobName,String groupName,int seconds,Class clazz){
		JobDetail jobs = JobBuilder.newJob(clazz).withIdentity(jobName,groupName).build();
		try {
			if(sched.isShutdown()){
				sched.start();
			}
			// 使用simpleTrigger规则
			Trigger trigger = TriggerBuilder.newTrigger().withIdentity(jobName, groupName)
				 .withSchedule(SimpleScheduleBuilder.repeatSecondlyForever(seconds).repeatForever())
				 .startNow().build();
			sched.scheduleJob(jobs, trigger);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		
	}
	/**
	 * 在任务中删除改作业
	 * @param jobName
	 */
	public static void deleteJob(String jobName){
		String groupName = jobName;
		try {
			if(sched.isShutdown()){
				sched.start();
			}else{
				JobKey key = new JobKey(jobName,groupName);
				sched.deleteJob(key);
			}
		} catch (SchedulerException e) {
			e.printStackTrace();
			new Exception(e);
		}
	}

}
